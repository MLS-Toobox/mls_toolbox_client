import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ModelSocket } from "../sockets";

export class ParameterNode extends Classic.Node implements Classic.Node
{
    width = 190;
    height = 150;
    color = "rgba(132, 132, 135, 0.5)";
    public static nodeName: string = "Parameter";
    info = {
      info: {
          title: 'Parameter to be reused by other nodes',
      },
      inputs: {
          description: {
              type: "string",
              value: "parameter description",
              show: true,
          },
          type : {
              type: "option",
              value: "Number",
              optionId: "parameter_type",
              show: true,
          },
      },
  };

    constructor() {
        super(ParameterNode.nodeName);
    }

    /**
     * Returns the data stored in the `info` property of the current object.
     *
     * @return {any} The data stored in the `info` property.
     */
    data() {
        return this.info;
    }

    getNodeName() {
        return ParameterNode.nodeName;
    }

    update() {
    }
    
  }