const constants = {
  /* auth */

  INDEX_PENDING: 'INDEX_PENDING',
  INDEX_SUCCESS: 'INDEX_SUCCESS',
  INDEX_FAILURE: 'INDEX_FAILURE',
  INDEX_COMPLETE: 'INDEX_COMPLETE',

  REGISTER_PENDING: 'REGISTER_PENDING',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  REGISTER_COMPLETE: 'REGISTER_COMPLETE',

  COMPLETE_REGISTRATION_PENDING: 'COMPLETE_REGISTRATION_PENDING',
  COMPLETE_REGISTRATION_SUCCESS: 'COMPLETE_REGISTRATION_SUCCESS',
  COMPLETE_REGISTRATION_FAILURE: 'COMPLETE_REGISTRATION_FAILURE',
  COMPLETE_REGISTRATION_COMPLETE: 'COMPLETE_REGISTRATION_COMPLETE',

  LOGOUT_PENDING: 'LOGOUT_PENDING',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  LOGOUT_COMPLETE: 'LOGOUT_COMPLETE',

  VERIFY_INDIVIDUAL_PENDING: 'VERIFY_INDIVIDUAL_PENDING',
  VERIFY_INDIVIDUAL_SUCCESS: 'VERIFY_INDIVIDUAL_SUCCESS',
  VERIFY_INDIVIDUAL_FAILURE: 'VERIFY_INDIVIDUAL_FAILURE',
  VERIFY_INDIVIDUAL_COMPLETE: 'VERIFY_INDIVIDUAL_COMPLETE',

  VERIFY_CORPORATE_PENDING: 'VERIFY_CORPORATE_PENDING',
  VERIFY_CORPORATE_SUCCESS: 'VERIFY_CORPORATE_SUCCESS',
  VERIFY_CORPORATE_FAILURE: 'VERIFY_CORPORATE_FAILURE',
  VERIFY_CORPORATE_COMPLETE: 'VERIFY_CORPORATE_COMPLETE',

  VERIFY_ACCOUNT_OTP_PENDING: 'VERIFY_ACCOUNT_OTP_PENDING',
  VERIFY_ACCOUNT_OTP_SUCCESS: 'VERIFY_ACCOUNT_OTP_SUCCESS',
  VERIFY_ACCOUNT_OTP_FAILURE: 'VERIFY_ACCOUNT_OTP_FAILURE',
  VERIFY_ACCOUNT_OTP_COMPLETE: 'VERIFY_ACCOUNT_OTP_COMPLETE',

  SEND_ACCOUNT_OTP_PENDING: 'SEND_ACCOUNT_OTP_PENDING',
  SEND_ACCOUNT_OTP_SUCCESS: 'SEND_ACCOUNT_OTP_SUCCESS',
  SEND_ACCOUNT_OTP_FAILURE: 'SEND_ACCOUNT_OTP_FAILURE',
  SEND_ACCOUNT_OTP_COMPLETE: 'SEND_ACCOUNT_OTP_COMPLETE',

  LOGIN_PENDING: 'LOGIN_PENDING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_COMPLETE: 'LOGIN_COMPLETE',

  CHANGE_PASSWORD_PENDING: 'CHANGE_PASSWORD_PENDING',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE',
  CHANGE_PASSWORD_COMPLETE: 'CHANGE_PASSWORD_COMPLETE',

  FORGOT_PASSWORD_PENDING: 'FORGOT_PASSWORD_PENDING',
  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE: 'FORGOT_PASSWORD_FAILURE',
  FORGOT_PASSWORD_COMPLETE: 'FORGOT_PASSWORD_COMPLETE',

  RESET_PASSWORD_PENDING: 'RESET_PASSWORD_PENDING',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
  RESET_PASSWORD_COMPLETE: 'RESET_PASSWORD_COMPLETE',

  /* uploads */
  UPLOAD_LOGO_PENDING: 'UPLOAD_LOGO_PENDING',
  UPLOAD_LOGO_PROGRESS: 'UPLOAD_LOGO_PROGRESS',
  UPLOAD_LOGO_SUCCESS: 'UPLOAD_LOGO_SUCCESS',
  UPLOAD_LOGO_FAILURE: 'UPLOAD_LOGO_FAILURE',
  UPLOAD_LOGO_COMPLETE: 'UPLOAD_LOGO_COMPLETE',

  UPLOAD_MEDIA_PENDING: 'UPLOAD_MEDIA_PENDING',
  UPLOAD_MEDIA_PROGRESS: 'UPLOAD_MEDIA_PROGRESS',
  UPLOAD_MEDIA_SUCCESS: 'UPLOAD_MEDIA_SUCCESS',
  UPLOAD_MEDIA_FAILURE: 'UPLOAD_MEDIA_FAILURE',
  UPLOAD_MEDIA_COMPLETE: 'UPLOAD_MEDIA_COMPLETE',

  DELETE_MEDIA_PENDING: 'DELETE_MEDIA_PENDING',
  DELETE_MEDIA_SUCCESS: 'DELETE_MEDIA_SUCCESS',
  DELETE_MEDIA_FAILURE: 'DELETE_MEDIA_FAILURE',
  DELETE_MEDIA_COMPLETE: 'DELETE_MEDIA_COMPLETE',

  /* projects */
  PROJECT_CATEGORIES_PENDING: 'PROJECT_CATEGORIES_PENDING',
  PROJECT_CATEGORIES_SUCCESS: 'PROJECT_CATEGORIES_SUCCESS',
  PROJECT_CATEGORIES_FAILURE: 'PROJECT_CATEGORIES_FAILURE',
  PROJECT_CATEGORIES_COMPLETE: 'PROJECT_CATEGORIES_COMPLETE',

  ENGAGEMENT_PENDING: 'ENGAGEMENT_PENDING',
  ENGAGEMENT_SUCCESS: 'ENGAGEMENT_SUCCESS',
  ENGAGEMENT_FAILURE: 'ENGAGEMENT_FAILURE',
  ENGAGEMENT_COMPLETE: 'ENGAGEMENT_COMPLETE',

  ENGAGEMENTS_PENDING: 'ENGAGEMENTS_PENDING',
  ENGAGEMENTS_SUCCESS: 'ENGAGEMENTS_SUCCESS',
  ENGAGEMENTS_FAILURE: 'ENGAGEMENTS_FAILURE',
  ENGAGEMENTS_COMPLETE: 'ENGAGEMENTS_COMPLETE',

  GET_ENGAGEMENT_PENDING: 'GET_ENGAGEMENT_PENDING',
  GET_ENGAGEMENT_SUCCESS: 'GET_ENGAGEMENT_SUCCESS',
  GET_ENGAGEMENT_FAILURE: 'GET_ENGAGEMENT_FAILURE',
  GET_ENGAGEMENT_COMPLETE: 'GET_ENGAGEMENT_COMPLETE',

  PROJECT_NAME_PENDING: 'PROJECT_PENDING',
  PROJECT_NAME_SUCCESS: 'PROJECT_SUCCESS',
  PROJECT_NAME_FAILURE: 'PROJECT_FAILURE',
  PROJECT_NAME_COMPLETE: 'PROJECT_COMPLETE',

  INCOMPLETE_PROJECTS_PENDING: 'INCOMPLETE_PROJECTS_PENDING',
  INCOMPLETE_PROJECTS_SUCCESS: 'INCOMPLETE_PROJECTS_SUCCESS',
  INCOMPLETE_PROJECTS_FAILURE: 'INCOMPLETE_PROJECTS_FAILURE',
  INCOMPLETE_PROJECTS_COMPLETE: 'INCOMPLETE_PROJECTS_COMPLETE',

  SUBMIT_PROJECT_PENDING: 'SUBMIT_PROJECT_PENDING',
  SUBMIT_PROJECT_SUCCESS: 'SUBMIT_PROJECT_SUCCESS',
  SUBMIT_PROJECT_FAILURE: 'SUBMIT_PROJECT_FAILURE',
  SUBMIT_PROJECT_COMPLETE: 'SUBMIT_PROJECT_COMPLETE',

  DELETE_PROJECT_PENDING: 'DELETE_PROJECT_PENDING',
  DELETE_PROJECT_SUCCESS: 'DELETE_PROJECT_SUCCESS',
  DELETE_PROJECT_COMPLETE: 'DELETE_PROJECT_COMPLETE',
  DELETE_PROJECT_FAILURE: 'DELETE_PROJECT_FAILURE',

  STOP_PROJECT_PENDING: 'STOP_PROJECT_PENDING',
  STOP_PROJECT_SUCCESS: 'STOP_PROJECT_SUCCESS',
  STOP_PROJECT_FAILURE: 'STOP_PROJECT_FAILURE',
  STOP_PROJECT_COMPLETE: 'STOP_PROJECT_COMPLETE',

  EDIT_PROJECT_1_SUCCESS: 'EDIT_PROJECT_1_SUCCESS',
  EDIT_PROJECT_1_FAILURE: 'EDIT_PROJECT_1_FAILURE',
  EDIT_PROJECT_1_PENDING: 'EDIT_PROJECT_1_PENDING',
  EDIT_PROJECT_1_COMPLETE: 'EDIT_PROJECT_1_COMPLETE',

  EDIT_PROJECT_SUCCESS: 'EDIT_PROJECT_SUCCESS',
  EDIT_PROJECT_FAILURE: 'EDIT_PROJECT_FAILURE',
  EDIT_PROJECT_PENDING: 'EDIT_PROJECT_PENDING',
  EDIT_PROJECT_COMPLETE: 'EDIT_PROJECT_COMPLETE',

  PROJECT_DETAILS_PENDING: 'PROJECT_DETAILS_PENDING',
  PROJECT_DETAILS_SUCCESS: 'PROJECT_DETAILS_SUCCESS',
  PROJECT_DETAILS_FAILURE: 'PROJECT_DETAILS_FAILURE',
  PROJECT_DETAILS_COMPLETE: 'PROJECT_DETAILS_COMPLETE',

  DETAILS_SIMILAR_PENDING: 'DETAILS_SIMILAR_PENDING',
  DETAILS_SIMILAR_SUCCESS: 'DETAILS_SIMILAR_SUCCESS',
  DETAILS_SIMILAR_FAILURE: 'DETAILS_SIMILAR_FAILURE',
  DETAILS_SIMILAR_COMPLETE: 'DETAILS_SIMILAR_COMPLETE',

  PROJECT_SUMMARY_PENDING: 'PROJECT_SUMMARY_PENDING',
  PROJECT_SUMMARY_SUCCESS: 'PROJECT_SUMMARY_SUCCESS',
  PROJECT_SUMMARY_FAILURE: 'PROJECT_SUMMARY_FAILURE',
  PROJECT_SUMMARY_COMPLETE: 'PROJECT_SUMMARY_COMPLETE',

  UPDATE_PROJECT_PENDING: 'UPDATE_PROJECT_PENDING',
  UPDATE_PROJECT_SUCCESS: 'UPDATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_FAILURE: 'UPDATE_PROJECT_FAILURE',
  UPDATE_PROJECT_COMPLETE: 'UPDATE_PROJECT_COMPLETE',

  PROJECT_UPDATES_PENDING: 'PROJECT_UPDATES_PENDING',
  PROJECT_UPDATES_SUCCESS: 'PROJECT_UPDATES_SUCCESS',
  PROJECT_UPDATES_FAILURE: 'PROJECT_UPDATES_FAILURE',
  PROJECT_UPDATES_COMPLETE: 'PROJECT_UPDATES_COMPLETE',

  EDIT_PROJECT_UPDATES_PENDING: 'EDIT_PROJECT_UPDATES_PENDING',
  EDIT_PROJECT_UPDATES_SUCCESS: 'EDIT_PROJECT_UPDATES_SUCCESS',
  EDIT_PROJECT_UPDATES_FAILURE: 'EDIT_PROJECT_UPDATES_FAILURE',
  EDIT_PROJECT_UPDATES_COMPLETE: 'EDIT_PROJECT_UPDATES_COMPLETE',

  PROJECT_BY_STATUS_PENDING: 'PROJECT_BY_STATUS_PENDING',
  PROJECT_BY_STATUS_SUCCESS: 'PROJECT_BY_STATUS_SUCCESS',
  PROJECT_BY_STATUS_SUCCESS_1: 'PROJECT_BY_STATUS_SUCCESS_1',
  PROJECT_BY_STATUS_FAILURE: 'PROJECT_BY_STATUS_FAILURE',
  PROJECT_BY_STATUS_COMPLETE: 'PROJECT_BY_STATUS_COMPLETE',

  INIT_PROJECT_PENDING: 'INIT_PROJECT_PENDING',
  INIT_PROJECT_SUCCESS: 'INIT_PROJECT_SUCCESS',
  INIT_PROJECT_FAILURE: 'INIT_PROJECT_FAILURE',
  INIT_PROJECT_COMPLETE: 'INIT_PROJECT_COMPLETE',

  EDIT_PROJECT_REQUEST_PENDING: 'EDIT_PROJECT_REQUEST_PENDING',
  EDIT_PROJECT_REQUEST_SUCCESS: 'EDIT_PROJECT_REQUEST_SUCCESS',
  EDIT_PROJECT_REQUEST_FAILURE: 'EDIT_PROJECT_REQUEST_FAILURE',
  EDIT_PROJECT_REQUEST_COMPLETE: 'EDIT_PROJECT_REQUEST_COMPLETE',

  SIMILAR_PROJECTS_PENDING: 'SIMILAR_PROJECTS_PENDING',
  SIMILAR_PROJECTS_SUCCESS: 'SIMILAR_PROJECTS_SUCCESS',
  SIMILAR_PROJECTS_FAILURE: 'SIMILAR_PROJECTS_FAILURE',
  SIMILAR_PROJECTS_COMPLETE: 'SIMILAR_PROJECTS_COMPLETE',

  SEARCH_PROJECTS_PENDING: 'SEARCH_PROJECTS_PENDING',
  SEARCH_PROJECTS_SUCCESS: 'SEARCH_PROJECTS_SUCCESS',
  SEARCH_PROJECTS_FAILURE: 'SEARCH_PROJECTS_FAILURE',
  SEARCH_PROJECTS_COMPLETE: ' SEARCH_PROJECTS_COMPLETE',

  POST_COMMENT_PENDING: 'POST_COMMENT_PENDING',
  POST_COMMENT_SUCCESS: 'POST_COMMENT_SUCCESS',
  POST_COMMENT_FAILURE: 'POST_COMMENT_FAILURE',
  POST_COMMENT_COMPLETE: 'POST_COMMENT_COMPLETE',

  PROJECT_COMMENTS_PENDING: 'PROJECT_COMMENTS_PENDING',
  PROJECT_COMMENTS_SUCCESS: 'PROJECT_COMMENTS_SUCCESS',
  PROJECT_COMMENTS_FAILURE: 'PROJECT_COMMENTS_FAILURE',
  PROJECT_COMMENTS_COMPLETE: 'PROJECT_COMMENTS_COMPLETE',

  COMMENTS_DONORS_PENDING: 'COMMENTS_DONORS_PENDING',
  COMMENTS_DONORS_SUCCESS: 'COMMENTS_DONORS_SUCCESS',
  COMMENTS_DONORS_FAILURE: 'COMMENTS_DONORS_FAILURE',
  COMMENTS_DONORS_COMPLETE: 'COMMENTS_DONORS_COMPLETE',

  GET_COMMENT_PENDING: 'GET_COMMENT_PENDING',
  GET_COMMENT_SUCCESS: 'GET_COMMENT_SUCCESS',
  GET_COMMENT_FAILURE: 'GET_COMMENT_FAILURE',
  GET_COMMENT_COMPLETE: 'GET_COMMENT_COMPLETE',

  PATCH_COMMENT_PENDING: 'PATCH_COMMENT_PENDING',
  PATCH_COMMENT_SUCCESS: 'PATCH_COMMENT_SUCCESS',
  PATCH_COMMENT_FAILURE: 'PATCH_COMMENT_FAILURE',
  PATCH_COMMENT_COMPLETE: 'PATCH_COMMENT_COMPLETE',

  PROJECT_DONORS_PENDING: 'PROJECT_DONORS_PENDING',
  PROJECT_DONORS_SUCCESS: 'PROJECT_DONORS_SUCCESS',
  PROJECT_DONORS_FAILURE: 'PROJECT_DONORS_FAILURE',
  PROJECT_DONORS_COMPLETE: 'PROJECT_DONORS_COMPLETE',

  PROJECT_DONATE_PENDING: 'PROJECT_DONATE_PENDING',
  PROJECT_DONATE_SUCCESS: 'PROJECT_DONATE_SUCCESS',
  PROJECT_DONATE_FAILURE: 'PROJECT_DONATE_FAILURE',
  PROJECT_DONATE_COMPLETE: 'PROJECT_DONATE_COMPLETE',

  // states and lgas

  STATE_LGAS_PENDING: 'STATE_LGAS_PENDING',
  STATE_LGAS_SUCCESS: 'STATE_LGAS_SUCCESS',
  STATE_LGAS_FAILURE: 'STATE_LGAS_FAILURE',
  STATE_LGAS_COMPLETE: 'STATE_LGAS_COMPLETE',

  /* profile */

  MY_PROFILE_PENDING: 'MY_PROFILE_PENDING',
  MY_PROFILE_SUCCESS: 'MY_PROFILE_SUCCESS',
  MY_PROFILE_FAILURE: 'MY_PROFILE_FAILURE',
  MY_PROFILE_COMPLETE: 'MY_PROFILE_COMPLETE',

  PROFILES_PENDING: 'PROFILES_PENDING',
  PROFILES_SUCCESS: 'PROFILES_SUCCESS',
  PROFILES_FAILURE: 'PROFILES_FAILURE',
  PROFILES_COMPLETE: 'PROFILES_COMPLETE',

  DP_PENDING: 'DP_PENDING',
  DP_SUCCESS: 'DP_SUCCESS',
  DP_FAILURE: 'DP_FAILURE',
  DP_COMPLETE: 'DP_COMPLETE',

  PERSONAL_ACCOUNTS_PENDING: 'PERSONAL_ACCOUNTS_PENDING',
  PERSONAL_ACCOUNTS_SUCCESS: 'PERSONAL_ACCOUNTS_SUCCESS',
  PERSONAL_ACCOUNTS_FAILURE: 'PERSONAL_ACCOUNTS_FAILURE',
  PERSONAL_ACCOUNTS_COMPLETE: 'PERSONAL_ACCOUNTS_COMPLETE',

  EDIT_PERSONAL_ACCOUNT_PENDING: 'EDIT_PERSONAL_ACCOUNTS_PENDING',
  EDIT_PERSONAL_ACCOUNT_SUCCESS: 'EDIT_PERSONAL_ACCOUNTS_SUCCESS',
  EDIT_PERSONAL_ACCOUNT_FAILURE: 'EDIT_PERSONAL_ACCOUNTS_FAILURE',
  EDIT_PERSONAL_ACCOUNT_COMPLETE: 'EDIT_PERSONAL_ACCOUNTS_COMPLETE',

  CORPORATE_MANAGERS_PENDING: 'CORPORATE_MANAGERS_PENDING',
  CORPORATE_MANAGERS_SUCCESS: 'CORPORATE_MANAGERS_SUCCESS',
  CORPORATE_MANAGERS_FAILURE: 'CORPORATE_MANAGERS_FAILURE',
  CORPORATE_MANAGERS_COMPLETE: 'CORPORATE_MANAGERS_COMPLETE',

  CHANGE_MANAGER_PENDING: 'CHANGE_MANAGER_PENDING',
  CHANGE_MANAGER_SUCCESS: 'CHANGE_MANAGER_SUCCESS',
  CHANGE_MANAGER_FAILURE: 'CHANGE_MANAGER_FAILURE',
  CHANGE_MANAGER_COMPLETE: 'CHANGE_MANAGER_COMPLETE',

  MY_PROJECTS_PENDING: 'MY_PROJECTS_PENDING',
  MY_PROJECTS_SUCCESS: 'MY_PROJECTS_SUCCESS',
  MY_PROJECTS_FAILURE: 'MY_PROJECTS_FAILURE',
  MY_PROJECTS_SUCCESS_1: 'MY_PROJECTS_SUCCESS_1',
  MY_PROJECTS_COMPLETE: 'MY_PROJECTS_COMPLETE',

  POPULAR_FUNDRAISERS_PENDING: 'POPULAR_FUNDRAISERS_PENDING',
  POPULAR_FUNDRAISERS_SUCCESS: 'POPULAR_FUNDRAISERS_SUCCESS',
  POPULAR_FUNDRAISERS_FAILURE: 'POPULAR_FUNDRAISERS_FAILURE',
  POPULAR_FUNDRAISERS_COMPLETE: 'POPULAR_FUNDRAISERS_COMPLETE',

  POPULAR_PROJECTS_PENDING: 'POPULAR_PROJECTS_PENDING',
  POPULAR_PROJECTS_SUCCESS: 'POPULAR_PROJECTS_SUCCESS',
  POPULAR_PROJECTS_FAILURE: 'POPULAR_PROJECTS_FAILURE',
  POPULAR_PROJECTS_COMPLETE: 'POPULAR_PROJECTS_COMPLETE',

  POPULAR_NGOS_PENDING: 'POPULAR_NGOS_PENDING',
  POPULAR_NGOS_SUCCESS: 'POPULAR_NGOS_SUCCESS',
  POPULAR_NGOS_FAILURE: 'POPULAR_NGOS_FAILURE',
  POPULAR_NGOS_COMPLETE: 'POPULAR_NGOS_COMPLETE',

  NOTIFICATIONS_PENDING: 'NOTIFICATIONS_PENDING',
  NOTIFICATIONS_SUCCESS: 'NOTIFICATIONS_SUCCESS',
  NOTIFICATIONS_FAILURE: 'NOTIFICATIONS_FAILURE',
  NOTIFICATIONS_COMPLETE: 'NOTIFICATIONS_COMPLETE',

  // payment

  USER_TRANSACTIONS_PENDING: 'USER_TRANSACTIONS_PENDING',
  USER_TRANSACTIONS_SUCCESS: 'USER_TRANSACTIONS_SUCCESS',
  USER_TRANSACTIONS_FAILURE: 'USER_TRANSACTIONS_FAILURE',
  USER_TRANSACTIONS_COMPLETE: 'USER_TRANSACTIONS_COMPLETE',

  PAYMENT_INITIATE_PENDING: 'PAYMENT_INITIATE_PENDING',
  PAYMENT_INITIATE_SUCCESS: 'PAYMENT_INITIATE_SUCCESS',
  PAYMENT_INITIATE_SUCCESS_1: 'PAYMENT_INITIATE_SUCCESS_1',
  PAYMENT_INITIATE_FAILURE: 'PAYMENT_INITIATE_FAILURE',
  PAYMENT_INITIATE_COMPLETE: 'PAYMENT_INITIATE_COMPLETE',

  PAYMENT_COMPLETE_PENDING: 'PAYMENT_COMPLETE_PENDING',
  PAYMENT_COMPLETE_SUCCESS: 'PAYMENT_COMPLETE_SUCCESS',
  PAYMENT_COMPLETE_FAILURE: 'PAYMENT_COMPLETE_FAILURE',
  PAYMENT_COMPLETE_COMPLETE: 'PAYMENT_COMPLETE_COMPLETE'
};

export default constants;
