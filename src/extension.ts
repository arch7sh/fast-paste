import * as vscode from "vscode";
import { StyleControl } from "./insertmode";

export function activate(context: vscode.ExtensionContext) {
  function registerCommandNice(
    commandId: string,
    run: (...args: any[]) => void
  ): void {
    context.subscriptions.push(vscode.commands.registerCommand(commandId, run));
  }

  const fastPaste = new FastPaste();

  registerCommandNice("fast-paste.normalMode", function (args) {
    fastPaste.switchToNormalMode();
    // fastPaste.setCursorStyle(fastPaste.checkIsNormalMode());
  });

  registerCommandNice("fast-paste.insertMode", function (args) {
    fastPaste.switchToInsertMode();
    // fastPaste.setCursorStyle(fastPaste.checkIsNormalMode());
    // vscode.window.showInformationMessage(String(fastPaste.checkIsNormalMode()));
  });
}

export function deactivate() {}

class FastPaste {
  private _styleControl;
  private _inNormalMode: ContextKey;
  constructor() {
    this._styleControl = new StyleControl();
    this._inNormalMode = new ContextKey("fast-paste.inNormalMode", true);
  }
  public checkIsNormalMode() {
    return this._inNormalMode.getValue();
  }
  public switchToNormalMode() {
    this._inNormalMode.set(true);
    this.setCursorStyle(this.checkIsNormalMode());
  }
  public switchToInsertMode() {
    this._inNormalMode.set(false);
    this.setCursorStyle(this.checkIsNormalMode());
  }
  public setCursorStyle(isNormalMode: boolean) {
    this._styleControl.setCursorStyle(isNormalMode);
  }
}

class ContextKey {
  private _name: string;
  private _value: boolean;
  constructor(name: string, value: boolean) {
    this._name = name;
    this._value = value;
    this.set(value);
  }
  public getValue() {
    return this._value;
  }
  public set(value: boolean): void {
    this._value = value;
    vscode.commands.executeCommand("setContext", this._name, this._value);
  }
}
