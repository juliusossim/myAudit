const paths = {
  APPLY: '/api/LoanApplication/Apply',
  PROCESS_BANK_STATEMENT: '/api/LoanApplication/ProcessMyBankStatement',
  PROCESS_UPLOADED_STATEMENT: '/api/LoanApplication/ProcessUploadedStatement',
  UPDATE_LOAN_OFFER: '/api/LoanApplication/UpdateLoanOffer',
  LOAN_OFFER_DETAILS: '/api/LoanApplication/LoanOfferDetails/{referenceId}',
  LOAN_OFFER_ACCEPTANCE: '/api/LoanApplication/LoanOfferAcceptance',
  LOAN_DISBURSED: '/api/LoanApplication/LoanDisbursed',
  GET_APPLICATIONS_DETAILS: '/api/LoanApplication/GetLoanApplicationDetails',
  GET_APPLICATION_DETAILS: '/api/LoanApplication/GetLoanApplicationDetail/{loanReferenceId}',
  GET_BANK_LIST: '/api/LoanApplication/GetBankList'
};

export default paths;
