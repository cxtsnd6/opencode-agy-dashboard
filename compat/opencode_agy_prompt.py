"""Adapt the system instruction at the local proxy's outbound AGY boundary."""

import re


_OPEN_CODE_START = re.compile(r"\AYou are opencode\b", re.IGNORECASE)


def adapt_system_instruction(request, preamble, *, as_user_message=False):
    """Return a new request containing the configured AGY preamble once."""
    if not isinstance(preamble, str) or not preamble.strip():
        raise ValueError("Provide the AGY preamble used by your proxy")

    original = request.get("systemInstruction") or {}
    parts = original.get("parts") or []
    existing = next((part for part in parts if part.get("text") == preamble), None)
    system_parts = [existing if existing is not None else {"text": preamble}]
    moved_text = []
    for part in parts:
        text = part.get("text")
        if not isinstance(text, str):
            system_parts.append(part)
            continue
        if text == preamble:
            continue
        if as_user_message and text:
            moved_text.append(text)
            extra = {key: value for key, value in part.items() if key != "text"}
            if extra:
                system_parts.append(extra)
        else:
            system_parts.append({**part, "text": _OPEN_CODE_START.sub("You are Antigravity", text)})

    adapted = {
        **request,
        "systemInstruction": {**original, "role": "user", "parts": system_parts},
    }
    if moved_text:
        text = "<system-instructions>\n" + "\n\n".join(moved_text) + "\n</system-instructions>"
        adapted["contents"] = [{"role": "user", "parts": [{"text": text}]}, *(request.get("contents") or [])]
    return adapted
