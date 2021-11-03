import { Link } from 'react-router-dom';
import React from 'react';
import FancySearch from '../../../components/form/fancySearch';
import ClientsTable from '../../../components/tables/clientsTable';

const ClientsTemp = ({
  formData
}) => (
  <div className="row ">
    <div className="col-md-10 offset-1">
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          CLIENTS
        </div>
        <div className="mr-3">
          <FancySearch />
        </div>
      </div>

      <div className="">
        <div className="d-flex justify-content-between">
          <div className="text-theme-black font-regular bold">All Clients</div>
          <div>
            <Link to="/app/clients/new-client" className="font-regular text-theme-blue">Create Client</Link>
          </div>
        </div>
        <ClientsTable data={formData} />
      </div>
    </div>
    {/* <Modal */}
    {/*  className={show ? 'max-w-400 right mid center' : 'max-w-400 right top off'} */}
    {/*  content={transactionTemp} */}
    {/* /> */}

  </div>
);
export default ClientsTemp;
