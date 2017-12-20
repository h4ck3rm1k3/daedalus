# daedalus
Wallet is working !
My receive address is DdzFFzCqrhsjVNdJGABBkC8MKyWxnVDGtiJ4QBN7vkpQ5WQvu9AvxVCgd3gGS3eeJLkcu5auzHcbd2abSv5c22zajmxgeJDuoXYYxr3Q
![image](https://steemitimages.com/DQmNQYgf4MSnDuottLQBXvcfJwsY8aNbyYBNjgu8GD3EZuc/image.png)
![DdzFFzCqrhsjVNdJGABBkC8MKyWxnVDGtiJ4QBN7vkpQ5WQvu9AvxVCgd3gGS3eeJLkcu5auzHcbd2abSv5c22zajmxgeJDuoXYYxr3Q](https://steemitimages.com/0x0/https://steemitimages.com/DQmQgS99msnGzhBr72485BYfSeAvraBT5nANqWuJU3cRYmr/image.png)

Daedalus - Cardano ADA cryptocurrency wallet debian build instructions

These are my build instructions for Debian GNU/Linux, removed all notes about windows and mac osx.
I am running the electron client on my laptop and the backend and middleware on my build server (debian-build-speed) that you see mentioned. The two ports needed are port forwarded via ssh.

## hot mode vs cold mode

If the electron is started with the HOT=1 env variable, the middleware server is loaded from localhost, otherwise the scripts are loaded from dist. The branch hothack https://github.com/h4ck3rm1k3/daedalus/compare/hothack?expand=1 removes those checks to resolve 

## Components

There are two parts to the wallet, the electron front end and the node js middleware that listens on port 4000, and there is the Backend node.
### nvm 
see  https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-ubuntu-12-04-lts/

    apt-get update

    apt-get install build-essential libssl-dev

    curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
    
We need v6 to work

    nvm install v6
    nvm use v6
    
### Install Node.js dependencies.

```bash
$ npm install

### Front end 

The front end runs in chromium and talks to localhost using a tool called [electron](https://electron.atom.io) 

```bash
$ npm run start-hot
```

This creates this process tree 

```
sh -c cross-env HOT=1 NODE_ENV=development electron -r babel-register -r babel-polyfill ./electron/main.development
node /home/mdupont/experiments/daedalus/node_modules/.bin/cross-env HOT=1 NODE_ENV=development electron -r babel-register -r babel-polyfill ./electron/main.development
node /home/mdupont/experiments/daedalus/node_modules/.bin/electron -r babel-register -r babel-polyfill ./electron/main.development
/home/mdupont/experiments/daedalus/node_modules/electron/dist/electron -r -r babel-register babel-polyfill ./electron/main.development
/home/mdupont/experiments/daedalus/node_modules/electron/dist/electron --type=zygote --no-sandbox
```

### Middleware

The middleware can be built  and run.

```bash
$ npm run hot-server
```

This creates the process tree

```  \_ node --preserve-symlinks -r babel-register webpack/server.js
\_ /nix/store/6rjxsy8cr9ixqcdi1zhfgyrrvfrps14d-cardano-sl-wallet-1.0.3/bin/cardano-node --web --no-ntp --configuration-file /nix/store/249kd8ajyh87gcrs6n3mjf9alvf58avb-cardano-sl/node/configuration.yaml --configuration-key mainnet_full --tlscert /nix/store/249kd8ajyh87gcrs6n3mjf9alvf58avb-cardano-sl/scripts/tls-files/server.crt --tlskey /nix/store/249kd8ajyh87gcrs6n3mjf9alvf58avb-cardano-sl/scripts/tls-files/server.key --tlsca /nix/store/249kd8ajyh87gcrs6n3mjf9alvf58avb-cardano-sl/scripts/tls-files/ca.crt --log-config /nix/store/249kd8ajyh87gcrs6n3mjf9alvf58avb-cardano-sl/scripts/log-templates/log-config-qa.yaml --topology /nix/store/q40m4yycsizxvmqm1vp7pbmj3frar2vv-topology-mainnet --logs-prefix state-wallet-mainnet/logs --db-path state-wallet-mainnet/db --wallet-db-path state-wallet-mainnet/wallet-db --keyfile state-wallet-mainnet/secret.key
```

### Port forwarding

The middleware can run on a local server with no front end, but it will need to be modified to listen on an ip address, it listens by default to localhost only. 

If your middleware is running on another machine, in my case `debian-build-speed` you will need to port forward the connection

```
ssh -L 4000:localhost:4000 -L 8090:localhost:8090 debian-build-speed
```

### Backend port 8090

Build the backend  according to these instructions 
https://github.com/input-output-hk/cardano-sl/blob/master/docs/how-to/build-cardano-sl-and-daedalus-from-source-code.md

```
    git checkout cardano-sl-1.0
    [nix-shell:~/cardano-sl]$ ./scripts/build/cardano-sl.sh 
```
    
Start the backend :
```
    ./connect-to-mainnet
```

## Open Issues
https://utopian.io/utopian-io/@h4ck3rm1k3st33m/uncaught-syntaxerror-unexpected-end-of-json-input



<br /><hr/><em>Posted on <a href="https://utopian.io/utopian-io/@h4ck3rm1k3st33m/building-on-debian-gnu-linux">Utopian.io -  Rewarding Open Source Contributors</a></em><hr/>
