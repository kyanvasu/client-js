/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK, { CompaniesBranchesInterface } from '../src/index';

const client = new KanvasSDK(Config);

const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

let branch: CompaniesBranchesInterface;

describe('Performs Companies Branches module Test', () => {
  beforeEach(async () =>{
    await client.auth.login(email, password);
    const branches = await client.companiesBranches.get({ format: true, q: '(is_deleted:0,companies_id:104)' });
    branch = branches.data[0]
  })

  test('Get all the users within a company branch', async () => {
    const users = await client.companiesBranches.getUsers(branch.id);
    expect(users.length).toBeGreaterThanOrEqual(0);
  })
  
  test('Get all the users within a company branch using pagination', async () => {
    const users = await client.companiesBranches.getUsers(branch.id, { format: true });
    expect(users.data.length).toBeGreaterThanOrEqual(0);
  })
})
