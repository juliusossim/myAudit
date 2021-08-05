import React, {
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Project1 = ({
  setAccordionTab, data, setData
}) => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [formData, setFormData] = useState({ ...data });

  return (
    <div className="pr-5 mt-3">

      <div>
        <p>
          Then we fell to work, and in fifteen minutes, it
          really did seem as if fairies had been at work there.
          Papa made a splendid fire in the old fireplace and stopped
          up the broken window with his own hat and coat. Mamma set the
          shivering children round the fire, and wrapped the poor woman
          in warm things. Betsey and the rest of us spread the table,
          and fed the starving little ones.

          towel for an apron, fed the smallest child; mamma dressed
          the poor little new-born baby as tenderly as if it had been her own.
          Betsey gave the mother gruel and tea, and comforted her with assurance
          of better days for all. Nan, Lu, Beth, and May flew about among the
          seven children, talking and laughing and trying to understand
          their funny, broken English. It was a very happy breakfast,
          though we get any of it; and when we came away,
          leaving them all so comfortable, and promising
          to bring clothes and food by and by,
          I think there were not in all the hungry little girls who gave away their breakfast,
          and contented themselves with a bit of bread and an apple of New Year&aposs day.
        </p>
      </div>
    </div>
  );
};
export default Project1;
