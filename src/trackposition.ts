import * as vscode from "vscode";

export class TrackPosition {
  private _editor: vscode.TextEditor | undefined;
  constructor(editor: vscode.TextEditor | undefined) {
    this._editor = editor;
  }
  public getCursorLinePosition() {
    if (this._editor) {
      return this._editor.selection.active;
    }
  }
}
