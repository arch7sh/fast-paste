import { TextEditorCursorStyle, window } from "vscode";

export class StyleControl {
  public setCursorStyle(isNormalMode: boolean) {
    if (window.activeTextEditor) {
      if (isNormalMode) {
        window.activeTextEditor.options.cursorStyle =
          TextEditorCursorStyle.Line;
      } else {
        window.activeTextEditor.options.cursorStyle =
          TextEditorCursorStyle.Underline;
      }
    }
  }
}
