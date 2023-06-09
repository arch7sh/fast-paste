import * as vscode from "vscode";
import { comments, languages, tag } from "./common";
import { TrackPosition } from "./trackposition";

export class TextInsert {
  private _editorLanguage: string;
  private _commentSymbol: string;
  constructor() {
    this._editorLanguage = "default";
    this._commentSymbol = "//";
  }
  public getLanguage() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      this._editorLanguage = editor.document.languageId;
    }
  }
  public insertText(text: string | undefined) {
    if (text) {
      const editor = vscode.window.activeTextEditor;
      const pos = new TrackPosition(editor).getCursorLinePosition();
      if (editor && pos) {
        editor.edit((editBuilder) => {
          editBuilder.insert(pos, text);
        });
      }
    }
  }
  public getCommentSymbol() {
    this.getLanguage();

    if (this._editorLanguage in languages.hashComment) {
      this._commentSymbol = comments.hash;
    } else if (this._editorLanguage in languages.aposComment) {
      this._commentSymbol = comments.apos;
    } else {
      this._commentSymbol = comments.default;
    }
    return this._commentSymbol;
  }
  public insertTag() {
    const comment = this.getCommentSymbol();
    this.insertText(`${comment}${tag}`);
  }
}
