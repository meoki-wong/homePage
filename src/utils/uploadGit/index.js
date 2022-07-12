
const { exec , execFile, spawn, execSync} = require('child_process');
const { stderr, stdout } = require('process');

exec('git tag release-test-cmd', (stderr, stdout)=>{
    console.log('---->stdout', stdout)
    if(!stderr){
            exec('git push --tag', (stderr, stdout)=>{
                console.log('+++stdout', stdout)
            })
    }
})