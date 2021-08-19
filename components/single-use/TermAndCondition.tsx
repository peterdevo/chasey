import classes from "./TermAndCondition.module.scss";
import { ImCancelCircle } from "react-icons/im";
const TermAndCondition = ({ isActive, setIsActive }) => {
  const onHide = () => {
    setIsActive(false);
  };
  return (
    <div className={isActive ? classes.termAndCondition : classes.hidden}>
      <p>
        <div
          style={{
            display:"flex",
            justifyContent:"right",
            padding:"10px"
          }}
        >
          <ImCancelCircle
            onClick={onHide}
            size={30}
            style={{
              cursor: "pointer",
                
            }}
          />
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac pharetra
        erat. In hac habitasse platea dictumst. Etiam velit sapien, blandit vel
        neque eu, vehicula interdum felis. Ut rutrum risus id elit mattis, sit
        amet sollicitudin risus imperdiet. Praesent lacinia et est id consequat.
        Morbi elementum massa lacus, id facilisis turpis eleifend in. Nunc et
        dignissim tortor. Integer id dolor at lectus viverra tempus non a lorem.
        In hac habitasse platea dictumst. Nullam consectetur neque id urna
        maximus, et accumsan ante dapibus. Etiam condimentum, ipsum sed gravida
        porta, tortor velit aliquam purus, nec volutpat elit orci ut nibh. Donec
        sed lobortis lorem, sit amet mattis mi. Maecenas quis tortor cursus
        purus dapibus sodales. Integer molestie erat in nulla dapibus, eget
        malesuada ex imperdiet. Pellentesque habitant morbi tristique senectus
        et netus et malesuada fames ac turpis egestas. Ut bibendum a tortor at
        pellentesque. Pellentesque sit amet vestibulum tellus, nec consequat
        odio. In eget enim massa. Cras placerat lorem at ante sollicitudin, sed
        porta tellus eleifend. Nunc diam nisi, varius id lacinia eget, varius
        laoreet ipsum. Fusce rutrum gravida nisi, venenatis ornare urna mollis
        vehicula. Phasellus interdum est vel libero lacinia, a varius erat
        dignissim. Nulla id efficitur nisi, eget consequat lacus. Pellentesque
        et nulla vel leo convallis luctus. Nullam libero nunc, malesuada nec
        euismod sed, dapibus sit amet diam. Suspendisse pulvinar vulputate
        tellus, nec fermentum lectus ultrices quis. Morbi ultricies felis ut
        eros aliquet, in ultricies turpis sodales. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Duis dapibus suscipit purus, id hendrerit
        tellus euismod quis. Ut id tellus dui. Quisque faucibus mauris non purus
        gravida auctor. In hac habitasse platea dictumst. Nam et tristique
        risus. Etiam laoreet urna fermentum turpis lobortis, sed cursus elit
        finibus. Etiam felis quam, ornare sit amet lectus ac, pellentesque
        accumsan leo. Nulla sollicitudin vulputate quam. Proin enim justo,
        blandit quis ornare at, iaculis eget metus. Phasellus vitae sagittis
        diam. Praesent scelerisque cursus sollicitudin. Proin arcu eros, iaculis
        quis nibh et, ullamcorper placerat nibh. Curabitur iaculis et ante ac
        elementum. Etiam auctor, nibh eu egestas semper, massa metus vestibulum
        mi, eu rhoncus est massa quis sapien. Phasellus efficitur, leo id
        rhoncus hendrerit, quam nisl laoreet ligula, sit amet commodo nunc diam
        eu dui. Phasellus elementum nunc quis est dictum, nec aliquet risus
        sodales. Aenean a mi arcu. Morbi bibendum urna tempor dui pretium
        vehicula. Nam ac rhoncus orci. Maecenas quis auctor est. Sed maximus
        vestibulum blandit. Nullam id ullamcorper nunc. In blandit, tortor eu
        ultricies vestibulum, ante lorem tincidunt sapien, nec semper augue
        metus nec arcu. Integer interdum enim nec ipsum sagittis iaculis.
        Aliquam bibendum elit id facilisis aliquet.
      </p>
    </div>
  );
};

export default TermAndCondition;
