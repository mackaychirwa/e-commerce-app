export function _bytes(bytes, forceUnit = null, format = '%01.2f %s', si = true) {
    if (typeof bytes !== 'number' || isNaN(bytes)) return '0 B';

    // Define units
    const units = si
        ? ['B', 'kB', 'MB', 'GB', 'TB', 'PB']  
        : ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']; 

    const mod = si ? 1000 : 1024; 

    // Find the unit to use
    let power = forceUnit ? units.indexOf(forceUnit) : (bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(mod)) : 0);
    if (power === -1) power = 0; 

    // Convert and format output
    const value = bytes / Math.pow(mod, power);
    return format.replace('%01.2f', value.toFixed(2)).replace('%s', units[power]);
}
