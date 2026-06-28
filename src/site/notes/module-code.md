---
{"dg-publish": true, "permalink": "/module-code/", "dg-note-properties": {}}
---

```python
            await self.inline.form(
                message=message,
                text=self.strings["tags_updated"].format(name=note_name),
                reply_markup=[
            {
                "text": "Check your note",
                "url": f"https://{self.config['username']}.github.io/{self.config['repo_name']}/{note_name}/",
            }
        ],
    )
```