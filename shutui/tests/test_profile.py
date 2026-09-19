import plistlib
import struct
import unittest
from pathlib import Path
from uuid import UUID


ROOT = Path(__file__).resolve().parents[1]


class ProfileTests(unittest.TestCase):
    def test_installable_profile_format(self):
        raw = next(ROOT.glob("*.mobileconfig")).read_bytes()
        # CoreFoundation's plist parser rejects an internal DTD subset, even [].
        doctype = raw.split(b"<!DOCTYPE", 1)[1].split(b">", 1)[0]
        self.assertNotIn(b"[", doctype)
        self.assertTrue(raw.startswith(b'<?xml version="1.0" encoding="UTF-8"?>'))
        profile = plistlib.loads(raw)
        self.assertEqual(profile["PayloadType"], "Configuration")
        self.assertEqual(len(profile["PayloadContent"]), 1)
        clip = profile["PayloadContent"][0]
        self.assertEqual(clip["PayloadType"], "com.apple.webClip.managed")
        for payload in (profile, clip):
            self.assertEqual(payload["PayloadVersion"], 1)
            self.assertTrue(payload["PayloadIdentifier"])
            UUID(payload["PayloadUUID"])
        self.assertTrue(clip["Label"])
        self.assertTrue(clip["URL"].startswith(("http://", "https://")))
        self.assertIs(clip["Precomposed"], True)
        icon = clip["Icon"]
        self.assertEqual(icon, (ROOT / "icon.png").read_bytes())
        self.assertEqual(icon[:8], b"\x89PNG\r\n\x1a\n")
        self.assertEqual(struct.unpack(">II", icon[16:24]), (180, 180))


if __name__ == "__main__":
    unittest.main()
