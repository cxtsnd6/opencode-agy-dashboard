from copy import deepcopy
import unittest

from opencode_agy_prompt import adapt_system_instruction


class SystemInstructionTests(unittest.TestCase):
    preamble = "You are Antigravity. Help with coding tasks."

    def setUp(self):
        self.request = {
            "sessionId": "test-session",
            "contents": [{"role": "user", "parts": [{"text": "You are opencode?"}]}],
            "systemInstruction": {
                "role": "system",
                "parts": [
                    {"text": "You are OpenCode, a coding agent.\nPreserve project style."},
                    {"text": "Keep the example 'You are opencode' literal."},
                    {"inlineData": {"mimeType": "text/plain", "data": "YWJj"}},
                ],
            },
        }

    def test_prefix_adaptation_preserves_context_and_is_idempotent(self):
        before = deepcopy(self.request)
        result = adapt_system_instruction(self.request, self.preamble)
        system = result["systemInstruction"]
        self.assertEqual(system["role"], "user")
        self.assertEqual(system["parts"][0], {"text": self.preamble})
        self.assertEqual(system["parts"][1]["text"], "You are Antigravity, a coding agent.\nPreserve project style.")
        self.assertEqual(system["parts"][2:], before["systemInstruction"]["parts"][1:])
        self.assertEqual(result["contents"], before["contents"])
        self.assertEqual(result["sessionId"], before["sessionId"])
        self.assertEqual(adapt_system_instruction(result, self.preamble), result)
        self.assertEqual(self.request, before)

    def test_user_message_mode_moves_only_the_client_system_text(self):
        result = adapt_system_instruction(self.request, self.preamble, as_user_message=True)
        self.assertEqual(result["systemInstruction"]["parts"], [
            {"text": self.preamble}, self.request["systemInstruction"]["parts"][2],
        ])
        first = result["contents"][0]
        self.assertEqual(first["role"], "user")
        self.assertEqual(first["parts"][0]["text"], "<system-instructions>\nYou are OpenCode, a coding agent.\nPreserve project style.\n\nKeep the example 'You are opencode' literal.\n</system-instructions>")
        self.assertEqual(result["contents"][1:], self.request["contents"])
        self.assertEqual(adapt_system_instruction(result, self.preamble, as_user_message=True), result)

    def test_empty_system_slot_after_proxy_conversion(self):
        request = {"contents": self.request["contents"]}
        result = adapt_system_instruction(request, self.preamble)
        self.assertEqual(result["systemInstruction"]["parts"], [{"text": self.preamble}])
        self.assertEqual(result["contents"], request["contents"])
