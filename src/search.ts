import * as vscode from "vscode";

export class Search {
  private _fileList: string[];
  private _filename: string;
  public _editorListener: vscode.Disposable;
  constructor() {
    this._fileList = [];
    this._filename = "";
    this._editorListener = new vscode.Disposable(() => {});
  }
  public async getFiles() {
    const files = await vscode.workspace.findFiles("**/*.*");
    for (const file of files) {
      this._fileList.push(file.fsPath);
    }
    console.log(this._fileList);
  }
  public showFiles() {
    vscode.window.showQuickPick(this._fileList, {
      placeHolder: "Files",
    });
  }
  public updateFileName(mode: boolean) {
    if (!mode) {
      this._editorListener = vscode.workspace.onDidChangeTextDocument(
        (change) => {
          console.log("ch");
        }
      );
    }
  }
  public removeListener() {
    this._editorListener.dispose();
  }
}
