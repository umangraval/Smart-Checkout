import React from "react";
import "./table.scss";

export default function Table(props) {
  return (
    <div className="Table">
      <table cellSpacing="4">
        <thead>
          <tr>
            {props.headers.map((cell) => (
              <th>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.contents.map((row, i) => (
            <tr>
              <td>{i + 1}</td>
              {Object.values(row).map((cell) => (
                <td>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
