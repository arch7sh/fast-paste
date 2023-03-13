import * as vscode from "vscode";
import * as fs from "fs";

export class ReadFile {
  constructor() {}
  public readFile(filePath: string | undefined) {
    if (filePath) {
      const content = fs.readFileSync(filePath, "utf-8");
      const firstOccurrence = content.indexOf("fast-!-paste");
      const lastOccurrence = content.lastIndexOf("fast-!-paste");
      console.log(content);
    }
  }
}
