# fast-paste README

Fast Paste is an extension that allows you to paste the contents of other files in your current editor with simple keybindings and the name of the file.

## Features

Use 'alt + I' [Windows] or 'cmd + I' [Mac] to open a dropdown and start typing the filename. Select the file you want from the dropdown. You can press enter to select the first file, or use the arrow keys.

This command copies the contents of the selected file into the current editor. Additionally, you can selectively copy a section of a file by adding a special comment to the file.

Special Comment: fast-!-paste

Use 'alt + /' [Windows] or 'cmd + /' [Mac] to quickly insert the special comment in your editor. Most languages are supported.

The extension copies all the content after the first comment until the next comment. If you have only one comment, it copies all the content after the first comment. If you don't have any comments, it copies the whole file. There should be at most two special comments in your file.
