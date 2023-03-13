import * as vscode from "vscode";
import { TrackPosition } from "./trackposition";
export class Search {
  private _fileList: string[];
  private _textChange: string;
  private _filePath: string | undefined;
  public _editorListener: vscode.Disposable;
  private _tracker: TrackPosition;
  private _activeEditor: vscode.TextEditor | undefined;
  constructor() {
    this._fileList = [];
    this._textChange = "";
    this._editorListener = new vscode.Disposable(() => {});
    this._activeEditor = vscode.window.activeTextEditor;
    this._tracker = new TrackPosition(this._activeEditor);
  }
  public async getFiles() {
    const files = await vscode.workspace.findFiles("**/*.*");
    for (const file of files) {
      this._fileList.push(file.fsPath);
    }
    // console.log(this._fileList);
  }
  public async showFiles() {
    const fpath = await vscode.window.showQuickPick(this._fileList, {
      placeHolder: "Files",
    });
    this._filePath = fpath;
  }
  public getFilePath() {
    return this._filePath;
  }
  //Not required after this point
  public trackDocumentChanges(mode: boolean) {
    if (this._activeEditor) {
      let pos = this._tracker.getCursorLinePosition();
      let prevPos = pos;
      this._editorListener = vscode.workspace.onDidChangeTextDocument(
        (event) => {
          prevPos = pos;
          pos = this._tracker.getCursorLinePosition();
          if (pos && prevPos) {
            if (pos.compareTo(prevPos) < 0) {
              if (this._textChange.length > 0) {
                this._textChange = this._textChange.slice(0, -1);
              }
            } else {
              this._textChange += event.contentChanges[0].text;
            }
          }
        }
      );
    }
  }
  public removeListener() {
    this._editorListener.dispose();
    console.log(this._textChange);
    this._textChange = "";
  }
}
