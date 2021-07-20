const db = require('./tests/tests.js');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create post', async () => {
    expect.assertions(1);
    const post = await db.Post.create({
        id: 1,
        firstName: 'Bobbie',
        lastName: 'Draper'
    });
    expect(post.id).toEqual(1);
});

test('get post', async () => {
    expect.assertions(2);
    const post = await db.Post.findByPk(1);
    expect(post.firstName).toEqual('Bobbie');
    expect(post.lastName).toEqual('Draper');
});

test('delete post', async () => {
    expect.assertions(1);
    await db.Post.destroy({
        where: {
            id: 1
        }
    });
    const post = await db.Post.findByPk(1);
    expect(post).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});