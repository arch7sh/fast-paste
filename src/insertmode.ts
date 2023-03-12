import {
  TextEditorCursorStyle,
  Position,
  Range,
  Selection,
  TextEditor,
  TextEditorRevealType,
  window,
} from "vscode";

export enum Mode {
  insert,
  normal,
}

export class Controller {
  public changeCursorStyle() {
    if (window.activeTextEditor) {
      window.activeTextEditor.options.cursorStyle =
        TextEditorCursorStyle.Underline;
    }
  }
}
