import { IBase } from "./root.types";

export interface ITimeBlockRespnose extends IBase {
  name: string;
  color?: string;
  duration: number;
  order: number;
}

export type TypeTimeBlockForm = Partial<Omit<ITimeBlockRespnose, "createdAt" | "updatedAt">>;


