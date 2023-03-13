import * as fs from "fs";
import { TextInsert } from "./textinsert";
import { tag } from "./common";

export class ReadFile {
  private _commentSymbol: TextInsert;
  constructor() {
    this._commentSymbol = new TextInsert();
  }
  public readFile(filePath: string | undefined) {
    const comment = this._commentSymbol.getCommentSymbol();
    if (filePath) {
      let content = fs.readFileSync(filePath, "utf-8");
      let firstOccurrence: number | undefined = content.indexOf(
        `${comment}${tag}`
      );
      let lastOccurrence: number | undefined = content.lastIndexOf(
        `${comment}${tag}`
      );
      if (lastOccurrence === firstOccurrence) {
        lastOccurrence = undefined;
      }
      if (firstOccurrence && lastOccurrence) {
        content = content.slice(firstOccurrence, lastOccurrence);
      } else if (firstOccurrence) {
        content = content.slice(firstOccurrence);
      } else {
      }
      return content;
    }
  }
}
