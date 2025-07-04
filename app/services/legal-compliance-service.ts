// Comprehensive Legal Compliance Service
export class LegalComplianceService {
  private static instance: LegalComplianceService;
  private regulations: Map<string, any> = new Map();
  private disclaimers: Map<string, any> = new Map();
  private complianceRules: Map<string, any> = new Map();

  static getInstance(): LegalComplianceService {
    if (!LegalComplianceService.instance) {
      LegalComplianceService.instance = new LegalComplianceService();
    }
    return LegalComplianceService.instance;
  }

  async initialize() {
    this.loadSecuritiesRegulations();
    this.loadAIRegulations();
    this.loadInvestmentAdvisoryRules();
    this.loadDataPrivacyRules();
    this.loadDisclaimers();
    this.loadComplianceFramework();
  }

  private loadSecuritiesRegulations() {
    const securitiesRegs = {
      securities_act_1933: {
        title: 'Securities Act of 1933',
        purpose: 'Regulates the offering and sale of securities',
        keyProvisions: [
          'Registration of securities offerings',
          'Disclosure requirements for public offerings',
          'Anti-fraud provisions',
          'Exemptions for private placements',
        ],
        compliance: {
          disclosure_requirements: 'All material information must be disclosed',
          registration_exemptions: 'Private placements under Regulation D',
          anti_fraud: 'No misrepresentations or omissions of material facts',
        },
      },
      securities_exchange_act_1934: {
        title: 'Securities Exchange Act of 1934',
        purpose: 'Regulates secondary market trading',
        keyProvisions: [
          'Registration of exchanges and broker-dealers',
          'Periodic reporting requirements',
          'Proxy solicitation rules',
          'Insider trading prohibitions',
        ],
        compliance: {
          broker_dealer_registration: 'Must register with SEC and FINRA',
          periodic_reporting: '10-K, 10-Q, 8-K filings required',
          insider_trading: 'Material non-public information restrictions',
        },
      },
      investment_advisers_act_1940: {
        title: 'Investment Advisers Act of 1940',
        purpose: 'Regulates investment advisers',
        keyProvisions: [
          'Registration requirements',
          'Fiduciary duty to clients',
          'Disclosure obligations',
          'Custody rules',
          'Code of ethics',
        ],
        compliance: {
          fiduciary_duty: "Must act in client's best interest",
          disclosure: 'Form ADV must be provided to clients',
          custody: 'Strict rules for holding client assets',
          conflicts_of_interest: 'Must disclose and manage conflicts',
        },
      },
    };

    this.regulations.set('securities', securitiesRegs);
  }

  private loadAIRegulations() {
    const aiRegs = {
      ai_governance_framework: {
        title: 'AI Governance and Ethics Framework',
        purpose: 'Ensure responsible AI use in financial services',
        principles: [
          'Transparency and Explainability',
          'Fairness and Non-discrimination',
          'Accountability and Human Oversight',
          'Privacy and Data Protection',
          'Robustness and Security',
        ],
        requirements: {
          model_validation: 'AI models must be validated and tested',
          bias_testing: 'Regular testing for discriminatory bias',
          human_oversight: 'Human review of AI decisions required',
          documentation: 'Comprehensive documentation of AI systems',
          monitoring: 'Continuous monitoring of AI performance',
        },
      },
      algorithmic_trading_rules: {
        title: 'Algorithmic Trading Regulations',
        purpose: 'Regulate automated trading systems',
        requirements: [
          'Risk controls and circuit breakers',
          'System testing and validation',
          'Audit trails and record keeping',
          'Market access controls',
          'Compliance monitoring',
        ],
        compliance: {
          pre_trade_controls: 'Position limits, order size limits',
          post_trade_monitoring: 'Real-time surveillance',
          kill_switches: 'Ability to immediately stop trading',
          testing: 'Comprehensive testing before deployment',
        },
      },
      robo_adviser_rules: {
        title: 'Robo-Adviser Regulations',
        purpose: 'Regulate automated investment advice',
        requirements: [
          'Fiduciary duty applies to robo-advisers',
          'Disclosure of algorithm limitations',
          'Suitability determinations',
          'Client onboarding procedures',
          'Ongoing monitoring',
        ],
        compliance: {
          suitability: 'Must determine investment suitability',
          disclosure: 'Clear disclosure of fees and limitations',
          supervision: 'Human oversight of automated advice',
          client_communication: 'Regular client updates and reviews',
        },
      },
    };

    this.regulations.set('ai', aiRegs);
  }

  private loadInvestmentAdvisoryRules() {
    const advisoryRules = {
      fiduciary_duty: {
        title: 'Fiduciary Duty Standards',
        description: 'Highest standard of care in financial relationships',
        components: {
          duty_of_care: {
            description: 'Must provide advice with skill and diligence',
            requirements: [
              'Reasonable investigation of investments',
              'Ongoing monitoring of recommendations',
              'Competent and diligent service',
            ],
          },
          duty_of_loyalty: {
            description: "Must act in client's best interest",
            requirements: [
              'Avoid conflicts of interest',
              'Disclose material conflicts',
              'Obtain informed consent for conflicts',
            ],
          },
        },
      },
      suitability_requirements: {
        title: 'Suitability and Best Interest Standards',
        description: 'Ensure recommendations are appropriate for clients',
        components: {
          customer_profile: [
            'Investment objectives',
            'Risk tolerance',
            'Time horizon',
            'Financial situation',
            'Investment experience',
          ],
          reasonable_basis: 'Must have reasonable basis for recommendations',
          customer_specific: 'Must be suitable for specific customer',
          quantitative: 'Must consider frequency and cost of transactions',
        },
      },
    };

    this.regulations.set('advisory', advisoryRules);
  }

  private loadDataPrivacyRules() {
    const privacyRules = {
      regulation_sp: {
        title: 'Regulation S-P (Privacy of Consumer Financial Information)',
        purpose: 'Protect consumer financial information',
        requirements: [
          'Privacy notices to customers',
          'Opt-out rights for information sharing',
          'Safeguards for customer information',
          'Restrictions on disclosure',
        ],
      },
      gdpr_compliance: {
        title: 'General Data Protection Regulation (GDPR)',
        purpose: "Protect EU residents' personal data",
        requirements: [
          'Lawful basis for processing',
          'Data subject rights',
          'Privacy by design',
          'Data breach notifications',
          'Data protection officer',
        ],
      },
      ccpa_compliance: {
        title: 'California Consumer Privacy Act (CCPA)',
        purpose: "Protect California residents' personal information",
        requirements: [
          'Right to know about data collection',
          'Right to delete personal information',
          'Right to opt-out of sale',
          'Non-discrimination provisions',
        ],
      },
    };

    this.regulations.set('privacy', privacyRules);
  }

  private loadDisclaimers() {
    const disclaimers = {
      investment_risk: {
        title: 'Investment Risk Disclosure',
        content: `
          IMPORTANT INVESTMENT RISK DISCLOSURE
          
          All investments involve risk, including the potential loss of principal. Past performance does not guarantee future results. 
          
          Key Risks:
          • Market Risk: Securities prices may decline due to market conditions
          • Credit Risk: Issuers may default on their obligations
          • Interest Rate Risk: Bond prices move inversely to interest rates
          • Inflation Risk: Purchasing power may be eroded over time
          • Liquidity Risk: Some investments may be difficult to sell
          • Currency Risk: Foreign investments subject to exchange rate fluctuations
          
          Before investing, carefully consider your investment objectives, risk tolerance, and time horizon.
        `,
        required: true,
        frequency: 'Every transaction',
      },
      ai_limitations: {
        title: 'AI Technology Limitations Disclosure',
        content: `
          ARTIFICIAL INTELLIGENCE LIMITATIONS DISCLOSURE
          
          Our AI systems provide analysis and recommendations based on historical data and mathematical models. Important limitations include:
          
          • AI predictions are not guarantees of future performance
          • Models may not account for unprecedented market conditions
          • Historical patterns may not repeat in the future
          • AI systems may have inherent biases or limitations
          • Human judgment should supplement AI recommendations
          • Technology failures or errors may occur
          
          AI-generated content should be considered as one factor in your investment decision-making process.
        `,
        required: true,
        frequency: 'Initial use and quarterly',
      },
      not_investment_advice: {
        title: 'Not Personalized Investment Advice',
        content: `
          NOT PERSONALIZED INVESTMENT ADVICE DISCLAIMER
          
          The information provided by this platform is for educational and informational purposes only and does not constitute personalized investment advice.
          
          • Content is general in nature and not tailored to individual circumstances
          • We do not know your specific financial situation, goals, or risk tolerance
          • You should consult with qualified financial professionals before making investment decisions
          • We are not acting as your investment adviser or fiduciary
          • All investment decisions are your responsibility
          
          This platform does not provide tax, legal, or accounting advice. Consult appropriate professionals for such guidance.
        `,
        required: true,
        frequency: 'Every session',
      },
      data_usage: {
        title: 'Data Usage and Privacy Disclosure',
        content: `
          DATA USAGE AND PRIVACY DISCLOSURE
          
          We collect and use your data to provide our services. Key points:
          
          • We collect trading data, preferences, and usage patterns
          • Data is used to improve AI models and personalize experience
          • We implement industry-standard security measures
          • We do not sell personal data to third parties
          • You have rights to access, correct, and delete your data
          • We comply with applicable privacy laws (GDPR, CCPA, etc.)
          
          For complete details, please review our Privacy Policy.
        `,
        required: true,
        frequency: 'Account opening and annually',
      },
      regulatory_status: {
        title: 'Regulatory Status Disclosure',
        content: `
          REGULATORY STATUS DISCLOSURE
          
          Important information about our regulatory status:
          
          • This platform is for educational and informational purposes
          • We are not a registered investment adviser or broker-dealer
          • We do not execute trades or hold customer funds
          • We do not provide personalized investment advice
          • All trading is conducted through your existing brokerage accounts
          • You are responsible for compliance with applicable laws and regulations
          
          If you need investment advice, please consult with a registered investment adviser.
        `,
        required: true,
        frequency: 'Account opening',
      },
    };

    this.disclaimers.set('standard', disclaimers);
  }

  private loadComplianceFramework() {
    const framework = {
      content_review: {
        title: 'Content Review and Approval Process',
        process: [
          'All educational content reviewed by compliance team',
          'AI-generated content flagged for human review',
          'Regular updates to reflect regulatory changes',
          'User feedback monitoring for compliance issues',
        ],
      },
      risk_monitoring: {
        title: 'Risk Monitoring and Controls',
        controls: [
          'Real-time monitoring of AI recommendations',
          'Bias testing and model validation',
          'User activity monitoring for unusual patterns',
          'Automated alerts for compliance violations',
        ],
      },
      record_keeping: {
        title: 'Record Keeping Requirements',
        requirements: [
          'Maintain records of all AI decisions and rationale',
          'User interaction logs and timestamps',
          'Model training data and validation results',
          'Compliance monitoring and testing records',
        ],
      },
      training_and_supervision: {
        title: 'Training and Supervision',
        requirements: [
          'Regular compliance training for all staff',
          'Supervision of AI system operations',
          'Escalation procedures for compliance issues',
          'Regular review and testing of procedures',
        ],
      },
    };

    this.complianceRules.set('framework', framework);
  }

  // Public API Methods
  getRequiredDisclaimer(context: string) {
    const disclaimers = this.disclaimers.get('standard');

    switch (context) {
      case 'investment_recommendation':
        return [
          disclaimers.investment_risk,
          disclaimers.ai_limitations,
          disclaimers.not_investment_advice,
        ];
      case 'ai_analysis':
        return [disclaimers.ai_limitations, disclaimers.not_investment_advice];
      case 'educational_content':
        return [disclaimers.not_investment_advice];
      case 'account_opening':
        return Object.values(disclaimers);
      default:
        return [disclaimers.not_investment_advice];
    }
  }

  validateCompliance(action: string, context: any) {
    const violations = [];

    // Check for required disclaimers
    if (action === 'provide_recommendation' && !context.disclaimerShown) {
      violations.push('Required investment risk disclaimer not displayed');
    }

    // Check for suitability requirements
    if (action === 'investment_advice' && !context.customerProfile) {
      violations.push('Customer suitability profile required for investment advice');
    }

    // Check for AI transparency requirements
    if (action === 'ai_recommendation' && !context.aiExplanation) {
      violations.push('AI decision rationale must be provided');
    }

    return {
      compliant: violations.length === 0,
      violations,
      requiredActions: this.getRequiredActions(violations),
    };
  }

  private getRequiredActions(violations: string[]) {
    return violations.map(violation => {
      switch (violation) {
        case 'Required investment risk disclaimer not displayed':
          return 'Display investment risk disclaimer before proceeding';
        case 'Customer suitability profile required for investment advice':
          return 'Collect customer suitability information';
        case 'AI decision rationale must be provided':
          return 'Provide explanation of AI recommendation logic';
        default:
          return 'Review compliance requirements';
      }
    });
  }

  getRegulationSummary(category: string) {
    return this.regulations.get(category);
  }

  generateComplianceReport() {
    return {
      timestamp: new Date(),
      regulations: {
        securities: this.regulations.get('securities'),
        ai: this.regulations.get('ai'),
        advisory: this.regulations.get('advisory'),
        privacy: this.regulations.get('privacy'),
      },
      disclaimers: this.disclaimers.get('standard'),
      framework: this.complianceRules.get('framework'),
      status: 'Compliant',
      lastReview: new Date(),
      nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    };
  }

  checkAIComplianceRequirements(aiDecision: any) {
    const requirements = {
      explainability: aiDecision.explanation ? 'Met' : 'Not Met',
      humanOversight: aiDecision.humanReviewed ? 'Met' : 'Required',
      biasChecking: aiDecision.biasChecked ? 'Met' : 'Required',
      documentation: aiDecision.documented ? 'Met' : 'Required',
      monitoring: 'Continuous',
    };

    const compliant = Object.values(requirements).every(
      req => req === 'Met' || req === 'Continuous'
    );

    return {
      compliant,
      requirements,
      recommendations: compliant
        ? []
        : [
            'Provide clear explanation of AI decision',
            'Implement human oversight review',
            'Conduct bias testing',
            'Document decision rationale',
          ],
    };
  }
}

export const legalComplianceService = LegalComplianceService.getInstance();
