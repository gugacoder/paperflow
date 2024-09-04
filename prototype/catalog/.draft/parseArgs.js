export default function parseArgs(args) {
    for (let key in args) {
      let value = args[key];
      
      // Handle null (omit the key-value pair)
      if (value === null || value === undefined) {
        delete args[key];
        continue;
      }
      
      // Handle boolean
      if (value === 'true' || value === 'false') {
        args[key] = (value === 'true');
        continue;
      }
      
      // Handle integer
      if (/^-?\d+$/.test(value)) {
        args[key] = parseInt(value, 10);
        continue;
      }
      
      // Handle decimal
      if (/^-?\d+\.\d+$/.test(value)) {
        args[key] = parseFloat(value);
        continue;
      }
  
      // Handle datetime: YYYY-MM-DDTHH:MM[:SS][.nnn]
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d{3})?$/.test(value)) {
        args[key] = new Date(value);
        continue;
      }
      
      // Handle date: YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        args[key] = new Date(value);
        continue;
      }
      
      // Handle time: HH:MM[:SS][.nnn]
      if (/^\d{2}:\d{2}(:\d{2})?(\.\d{3})?$/.test(value)) {
        args[key] = value; // Time is handled as a string
        continue;
      }
      
      // Handle period: -P0Y0M0DT0H0M0S
      if (/^-?P\d+Y\d+M\d+DT\d+H\d+M\d+S$/.test(value)) {
        args[key] = value; // Leave period as string representation
        continue;
      }
  
      // Handle timespan: -D.HH:MM[:SS][.nnn]
      if (/^-?\d+\.\d{2}:\d{2}(:\d{2})?(\.\d{3})?$/.test(value)) {
        args[key] = value; // Leave timespan as string
        continue;
      }
      
      // Handle JSON object
      if (/^{.*}$/.test(value)) {
        try {
          args[key] = JSON.parse(value);
        } catch (e) {
          // If parsing fails, fallback to string
          args[key] = value;
        }
        continue;
      }
      
      // Handle array: [a;b;...]
      if (/^\[.*\]$/.test(value)) {
        args[key] = value.slice(1, -1).split(';');
        continue;
      }
      
      // Handle range: (a;b) | (a;) | (;b)
      if (/^\(.*;.*\)$/.test(value)) {
        let [min, max] = value.slice(1, -1).split(';');
        args[key] = {};
        if (min) args[key].min = min;
        if (max) args[key].max = max;
        continue;
      }
      
      // Handle dictionary: (key=value;...)
      if (/^\(.*=.*\)$/.test(value)) {
        let dict = {};
        value.slice(1, -1).split(';').forEach(pair => {
          let [dictKey, dictValue] = pair.split('=');
          dict[dictKey] = dictValue;
        });
        args[key] = dict;
        continue;
      }
  
      // Fallback: treat as string
      args[key] = value;
    }
    
    return args;
  }
  