import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { IoIosAdd } from 'react-icons/all';
import Loader from '../../components/microComponents/loader';
import { apiOptions } from '../../services/fetch';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import NewClientTemp from './temps/NewClient';
import newClientProps from './constants/newClients';
import FormBuilder from '../../components/form/builders/form';
import newClientProps1 from './constants/newClients1';
import ControlledAccordions from '../../components/ui/accordion';

const NewClients = () => {
  const [formData, setFormData] = useState(
    {
      is_part_of_group: 0,
      is_public_entity: 0,
      subsidiary_nature: [],
      director_name: [],
      director_units_held: [],
      subsidiary_name: [],
      subsidiary_nature_of_business: [],
      director_designation: [],
      subsidiary_percentage_holding: []
    }
  );
  const [panel, setPanel] = useState(1);
  const [errors, setErrors] = useState({});

  /* redux */
  const store = useSelector((state) => state.users.newClient);

  const options = {
    action: 'CREATE_CLIENT',
    apiOpts: apiOptions({
      body: formData,
      endpoint: 'CREATE_CLIENT',
      auth: true,
      method: 'post'
    })
  };
  const {
    handleBlur, handleChange, create, status, handleChecked
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    store,
    options,
    redirect: '/app/clients'
  });
  useEffect(() => {
    if (!formData.is_public_entity) {
      setFormData({
        ...formData,
        subsidiary_nature_of_business: [],
        subsidiary_percentage_holding: [],
        subsidiary_name: []
      });
    }
  }, [formData.is_public_entity]);
  const temp = (
    <div>
      <FormBuilder formItems={
        newClientProps1(
          {
            formData,
            handleBlur,
            handleChange,
            errors,
            handleChecked,
            setFormData
          }
        )
      }
      />
    </div>
  );
  const [accordionData, setAccordionData] = useState(
    [
      {
        panel,
        name: 'Managing Director Info',
        details: temp
      }
    ]
  );
  const addAccordion = () => {
    setPanel(panel + 1);
    setAccordionData(
      [...accordionData,
        {
          panel: panel + 1,
          name: `Director ${panel} Info`,
          details: temp
        }]
    );
  };
  return (
    status === 'pending'
      ? <Loader />
      : (
        <div>
          <NewClientTemp
            formData={formData}
            create={create}
            link="/app/clients/new-client/directors"
            table={(
              <div>
                <div>
                  <FormBuilder formItems={
                    newClientProps(
                      {
                        formData,
                        handleBlur,
                        handleChange,
                        errors,
                        handleChecked,
                        setFormData
                      }
                    )
                  }
                  />
                </div>
                <ControlledAccordions data={accordionData} />
                <div>
                  <Button startIcon={<IoIosAdd />} onClick={addAccordion}>director</Button>
                </div>
              </div>
            )}
          />
        </div>
      )
  );
};

export default NewClients;
