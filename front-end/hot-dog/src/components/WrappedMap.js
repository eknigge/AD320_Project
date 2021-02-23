import { withScriptjs, withGoogleMap } from 'react-google-maps';

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
