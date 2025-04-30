import React, { memo } from "react";
import { useWindowSize } from "@reach/window-size";
import { Bling as GPT } from "react-gpt";

// import { Bling as GPT } from "react-gpt";

const MrecInner = memo(() => {
// export default function MrecHome() {

    const { width, height } = useWindowSize();

    return (
        <>
            <div className="mtb-8">
                {width > 768 ?
                    <>
                        {/* <h1>Dektop</h1> */}
                        <center>
                        {/* <img src="https://tpc.googlesyndication.com/simgad/1282282443567809860"/> */}
                        {/* <GPT
                            adUnitPath="/67551462/aryzap-mrec"
                            slotSize={[[300, 600], [120, 600], [160, 600], [300, 250], 'fluid']}
                        /> */}
                        <GPT
                            adUnitPath="/67551462/aryzap-mrec"
                            slotSize={[[300, 250], [250, 250], 'fluid']}
                        />
                        </center>

                    </>
                    :

                    <>
                        {/* <h1>Mobile</h1> */}
                        <center>
                        <GPT
                            adUnitPath="/67551462/aryzap-mrec"
                            slotSize={[[250, 250], [300, 250], 'fluid', [320, 50]]}
                        />
                        </center>
                    </>
                }
            </div>
        </>
  );
});

MrecInner.displayName = "MrecInner";
export default MrecInner;
