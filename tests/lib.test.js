const lib = require('../lib');
/*
test('Our first test', ()=> {
    //throw new Error('Something failed');
})
*/
describe('registerUser', ()=> {
    it('should throw error if username is falsy', ()=> {
        const args = [null, undefined, NaN, '', 0, false]; 
        args.forEach( a => {
            expect(()=>{lib.registerUser(a)}).toThrow();
        });
    });
    it('should return a user object if valid username is passed', ()=> {
        const result = lib.registerUser('agnik');
        expect(result).toMatchObject({username:'agnik'});
        expect(result.id).toBeGreaterThan(0);
    });
});