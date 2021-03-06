import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Analysis, Vulnerability } from '../entities/vulnerability';

const horusecResultPath = path.join(vscode.workspace.rootPath || '', 'horusec-result.json');

export function parseOutputToAnalysis(): Analysis {
  try {
    let data = fs.readFileSync(horusecResultPath);
    fs.unlinkSync(horusecResultPath);
    return JSON.parse(data.toString());
  } catch (error) {
    return {} as Analysis;
  }
}

export function parseAnalysisToVulnerabilities(analysis: Analysis): Vulnerability[] {
  let vulnerabilities: Vulnerability[] = [];
  if (analysis.analysisVulnerabilities) {
    analysis.analysisVulnerabilities.forEach((av) => {
      vulnerabilities.push(av.vulnerabilities);
    });
  }
  return vulnerabilities.filter((vul) => vul.type === 'Vulnerability');
}
