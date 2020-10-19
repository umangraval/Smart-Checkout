import React from 'react';
import {Sunburst, LabelSeries} from 'react-vis';
// import LabelSeries from './LabelSeries';

const DIVERGING_COLOR_SCALE = ['#522d5b', '#d7385e', '#b52b65', '#fb7b6b', '#ed6663','#ffa372','#e7d39f'];

const LABEL_STYLE = {
  fontSize: '1.5rem',
  textAnchor: 'middle'
};

function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent)
  );
}

function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath));
  }
  if (!data.hex) {
    data.style = {
      fill: DIVERGING_COLOR_SCALE[Math.round(data.color*7)]
    };
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.name] ? 0.2 : 1
  };

  return data;
}

export default class BasicSunburst extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pathValue: false,
      data: props.data,
      finalValue: 'Sales',
      clicked: false,
      indx:-1,
    };
  }
  render() {
    const {data, finalValue, pathValue } = this.state;
    return (
      <div>
        <div onClick={() => this.setState({data: this.props.data, indx:-1, finalValue: 'Sales'})}>
          BACK
        </div>
        <Sunburst
          animation
          // className="basic-sunburst-example"
          hideRootNode
          colorRange={DIVERGING_COLOR_SCALE}
          onValueMouseOver={node => {
            const path = getKeyPath(node).reverse();
            const pathAsMap = path.reduce((res, row) => {
              res[row] = true;
              return res;
            }, {});
            this.setState({
              finalValue: path[path.length - 1],
              pathValue: path.join(' > '),
              data: updateData(this.state.data, pathAsMap)
            });
          }}
          onValueMouseOut={() =>
            this.setState({
              pathValue: false,
              finalValue: 'Sales',
              data: updateData(this.state.data, false)
            })
          }
          onValueClick={(node)=> {
            if(node.depth===1) {
              const children = this.props.data.children.map(child => child.name);
              const index = children.findIndex((name)=> name === node.name);
              this.setState({data: data.children[index], indx:index, finalValue: node.name});
            }
          }}
          data={data}
          height={300}
          width={300}
        >
          {finalValue && (
            <LabelSeries
              data={[{x: 0, y: 0, label: finalValue, style: LABEL_STYLE}]}
            />
          )}
          
        </Sunburst>
        <div className="basic-sunburst-example-path-name">{pathValue}</div>
      </div>
    );
  }
}