import * as vscode from "vscode";
import { Controller } from "./insertmode";

export function activate(context: vscode.ExtensionContext) {
  function registerCommandNice(
    commandId: string,
    run: (...args: any[]) => void
  ): void {
    context.subscriptions.push(vscode.commands.registerCommand(commandId, run));
  }

  const fastPaste = new FastPaste();

  registerCommandNice("fast-paste.changeMode", function (args) {
    fastPaste.changeCursorStyle();
  });
}

export function deactivate() {}

class FastPaste {
  private _controller;
  constructor() {
    this._controller = new Controller();
  }
  public changeCursorStyle() {
    this._controller.changeCursorStyle();
  }
}
