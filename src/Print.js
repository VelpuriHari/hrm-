import { useRef } from "react";
import ReactToPrint from "react-to-print";
const Print = () => {
  const ref = useRef(null);
  const componentRef = useRef();
  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef.current}
      />

      <div ref={ref}>
        {/* enter the block that you want to print here */}kugfdz
      </div>
    </>
  );
};

export default Print;
