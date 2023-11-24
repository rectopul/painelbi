const formatarData = (dataString: string): string => {
    const data = new Date(dataString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(data);
}

export { formatarData }