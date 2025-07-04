// runPython.ts
import { exec } from 'child_process';

exec('python server.py', (error, stdout, stderr) => {
  if (error) return console.error(`Erro: ${error.message}`);
  if (stderr) return console.error(`stderr: ${stderr}`);
  console.log(`stdout: ${stdout}`);
});