import "./Support.css";
export default function Cards({ title, data }) {
  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <div className="DataDisplayCont">
          {data.map((id, index) => (
            <div key={index} className="profile1">
              <table>
                {Object.entries(id).map(([key, value]) => (
                  <tr>
                    <td>
                      <b> {key}</b>
                    </td>
                    <td>:{value}</td>
                  </tr>
                ))}
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
