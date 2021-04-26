import React from "react";
import { Sunburst, LabelSeries } from "react-vis";
// import LabelSeries from './LabelSeries';

const DIVERGING_COLOR_SCALE = [
  "#522d5b",
  "#d7385e",
  "#b52b65",
  "#fb7b6b",
  "#ed6663",
  "#ffa372",
  "#e7d39f",
];

const LABEL_STYLE = {
  fontSize: "1.5rem",
  textAnchor: "middle",
};

function getKeyPath(node) {
  if (!node.parent) {
    return ["root"];
  }

  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent)
  );
}

function updateData(data, keyPath) {
  if (data.children) {
    data.children.map((child) => updateData(child, keyPath));
  }
  if (!data.hex) {
    data.style = {
      fill: DIVERGING_COLOR_SCALE[Math.round(data.color * 7)],
    };
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.name] ? 0.2 : 1,
  };

  return data;
}

export default class BasicSunburst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathValue: false,
      finalValue: "Categories",
      clicked: false,
      indx: -1,
    };
  }
  render() {
    const { finalValue } = this.state;
    return (
      <div className="chart">
        <h1>Category Sales</h1>
        <Sunburst
          animation
          hideRootNode
          colorRange={DIVERGING_COLOR_SCALE}
          onValueMouseOver={(node) => {
            const path = getKeyPath(node).reverse();
            const pathAsMap = path.reduce((res, row) => {
              res[row] = true;
              return res;
            }, {});
            const nos = this.props.data.children.filter(
              (child) => child.name === path[path.length - 1]
            )[0].size;
            this.setState({
              finalValue: `${path[path.length - 1]} : ${nos}`,
              pathValue: path.join(" > "),
              data: updateData(this.props.data, pathAsMap),
            });
          }}
          onValueMouseOut={() =>
            this.setState({
              pathValue: false,
              finalValue: "Categories",
              data: updateData(this.props.data, false),
            })
          }
          data={this.props.data}
          height={300}
          width={300}
        >
          {finalValue && (
            <LabelSeries
              data={[{ x: 0, y: 0, label: finalValue, style: LABEL_STYLE }]}
            />
          )}
        </Sunburst>
        {/* <div className="basic-sunburst-example-path-name">{}</div> */}
      </div>
    );
  }
}
