const fs = require( 'fs' );

fs.readFile( 'enpass_export.json', dataParser );

function dataParser( err, data ) {
    if ( err ) {
        console.error( err );
        process.exit( 0 );
        return;
    }
    console.log( 'Parsing...' );

    const items = JSON.parse( data ).items;

    const output = [
        'Title,Website,Username,Password',
        ...items.map( itemToCsvString ),
    ].join( '\n' );

    fs.writeFile( 'output.csv', output, err => {
        if ( err ) {
            console.error( err );
            process.exit( 0 );
        }
        console.log( 'Result saved to output.csv!' );
    } );
}

function itemToCsvString( item ) {
    if ( item.category === 'note' ) {
        return '';
    }
    const { fields, title } = item;
    const username = getItemValue( fields, 'username' );
    const email = getItemValue( fields, 'email' );
    const link = getItemValue( fields, 'url' );

    let password = getItemValue( fields, 'password' );
    if ( password.includes( ',' ) || password.includes( ' ' ) ) {
        password = `"${password}"`; // Wrap in quotes
    }
    const desiredUsername = username ? username : email;

    return `${title || ''},${link || ''},${desiredUsername || ''},${password || ''}`;
}

function getItemValue( fields, matchType ) {
    const field = fields.find( ( { type } ) => type === matchType );

    return field ? field.value : '';
}