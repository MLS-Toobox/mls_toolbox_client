import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class ReplaceNullNode extends Classic.Node<
{ origin_table: DataFrameSocket },
{ resulting_table: DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 110;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Replace Null";
    info = {
      info: {
          title: 'Replace Null values',
      },
      inputs: {
          value: {
              type: "string",
              value: "0",
          },
          dataset_tag: {
              type: "string",
              value: "",
          }
      },
    };
    constructor() {
      super('Replace Null');
  
      this.addInput('origin_table', new Classic.Input(new DataFrameSocket(), ''));
      this.addOutput('resulting_table', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return ReplaceNullNode.nodeName;
    }
    update() {
    }
  }