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
  const store = useSelector((state) => (
    state.project?.detailsSimilar?.data?.data?.project?.description
  ));
  /* state */
  const [formData, setFormData] = useState({ ...data });

  return (
    <div className="pr-5 mt-3">

      <div>
        <p>
          {store}
        </p>
      </div>
    </div>
  );
};
export default Project1;
