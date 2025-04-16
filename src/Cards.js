import "./Support.css";

export default function Cards({ title, data }) {
  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <div className="DataDisplayCont">
          {data.length
            ? data.map((id, index) => (
                <div key={index} className="profile1">
                  <table>
                    {Object.entries(id).map(([key, value]) =>
                      key !== "support_userid" &&
                      key !== "journalid" &&
                      key !== "tlpuserid" &&
                      key !== "certificationid" &&
                      key !== "eventuserid" &&
                      key !== "patentuserid" ? (
                        <tr key={key}>
                          <td>
                            <b>{key}</b>
                          </td>
                          <td>: {value}</td>
                        </tr>
                      ) : null
                    )}
                  </table>
                </div>
              ))
            : "NO DATA"}
        </div>
      </div>
    </>
  );
}
