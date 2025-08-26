const Profile = require('onf-core-model-ap/applicationPattern/onfModel/models/Profile');
const ProfileCollection = require('onf-core-model-ap/applicationPattern/onfModel/models/ProfileCollection');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');

/**
 * This function returns the string-value object for given string-name
 * 
 * @param {String} stringProfileName - name of the string-profile
 * @returns {Object} stringValue - returns the string-profile/configuration/string-value
 */
exports.getStringValueForStringProfileNameAsync = async function (stringProfileName) {
  let stringValue;
  let profileList = await ProfileCollection.getProfileListAsync();
  for (let i = 0; i < profileList.length; i++) {
    let profileInstance = profileList[i];
    let profileName = profileInstance[onfAttributes.PROFILE.PROFILE_NAME];
    if (profileName == Profile.profileNameEnum.STRING_PROFILE) {
      let stringName = profileInstance[onfAttributes.STRING_PROFILE.PAC][onfAttributes.STRING_PROFILE.CAPABILITY][onfAttributes.STRING_PROFILE.STRING_NAME];
      if (stringName == stringProfileName) {
        stringValue = profileInstance[onfAttributes.STRING_PROFILE.PAC][onfAttributes.STRING_PROFILE.CONFIGURATION][onfAttributes.STRING_PROFILE.STRING_VALUE];
        break;
      }
    }
  }
  return stringValue;
}

/**
 * This function returns the string-name for given uuid
 * 
 * @param {String} uuid - uuid of the string-profile
 * @returns {String} stringName - returns the string-profile/capability/string-name
 */
exports.getStringNameForUuidAsync = async function (uuid) {
  let stringName;
  try {
    let profileList = await ProfileCollection.getProfileListForProfileNameAsync(Profile.profileNameEnum.STRING_PROFILE);
    for (let i = 0; i < profileList.length; i++) {
      let profileInstance = profileList[i];
      let stringProfileUuid = profileInstance["uuid"];
      if (stringProfileUuid == uuid) {
        stringName = profileInstance[onfAttributes.STRING_PROFILE.PAC][onfAttributes.STRING_PROFILE.CAPABILITY][onfAttributes.STRING_PROFILE.STRING_NAME];
        break;
      }
    }
    return stringName;
  } catch (error) {
    throw error;
  }

}