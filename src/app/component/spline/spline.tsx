import "./spline.scss";
import Spline from "@splinetool/react-spline";

const SplineBackground = () => {
  const handleSceneLoad = () => {
    console.log("Scene loaded");
  };

  return (
    <div className="spline-container">
      <div className="spline-wrapper left">
        <Spline
          scene="https://prod.spline.design/694-metfFy-UOCEO/scene.splinecode"
          onLoad={handleSceneLoad}
        />
      </div>
      <div className="spline-wrapper right">
        <Spline
          scene="https://prod.spline.design/EzU7loQbE8tQLZSl/scene.splinecode"
          onLoad={handleSceneLoad}
        />
      </div>
    </div>
  );
};

export default SplineBackground;
