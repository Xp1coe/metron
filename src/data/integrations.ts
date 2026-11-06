import type { Integration } from "@/features/integrations/types";

/** Imported from tests/Platform List.xlsx. Names and category assignments are preserved.
 * The workbook does not supply logos, integration titles, or descriptions.
 * Platform names serve as integration labels; descriptions remain empty.
 * Local SVGs are text placeholders, not official brand artwork.
 * Regenerate with: python scripts/import-platforms.py
 */
export const integrationCatalog: Integration[] = [
  {
    "id": "qualys",
    "serviceName": "Qualys",
    "image": {
      "src": "/images/services/qualys.svg",
      "alt": "Qualys"
    },
    "platform": "Qualys",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "qualys-integration",
        "name": "Qualys",
        "description": ""
      }
    ]
  },
  {
    "id": "radiflow",
    "serviceName": "Radiflow",
    "image": {
      "src": "/images/services/radiflow.svg",
      "alt": "Radiflow"
    },
    "platform": "Radiflow",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "radiflow-integration",
        "name": "Radiflow",
        "description": ""
      }
    ]
  },
  {
    "id": "recorded-future",
    "serviceName": "Recorded Future",
    "image": {
      "src": "/images/services/recorded-future.svg",
      "alt": "Recorded Future"
    },
    "platform": "Recorded Future",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "recorded-future-integration",
        "name": "Recorded Future",
        "description": ""
      }
    ]
  },
  {
    "id": "reftab",
    "serviceName": "Reftab",
    "image": {
      "src": "/images/services/reftab.svg",
      "alt": "Reftab"
    },
    "platform": "Reftab",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "reftab-integration",
        "name": "Reftab",
        "description": ""
      }
    ]
  },
  {
    "id": "remediant",
    "serviceName": "Remediant",
    "image": {
      "src": "/images/services/remediant.svg",
      "alt": "Remediant"
    },
    "platform": "Remediant",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "remediant-integration",
        "name": "Remediant",
        "description": ""
      }
    ]
  },
  {
    "id": "safebreach",
    "serviceName": "SafeBreach",
    "image": {
      "src": "/images/services/safebreach.svg",
      "alt": "SafeBreach"
    },
    "platform": "SafeBreach",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "safebreach-integration",
        "name": "SafeBreach",
        "description": ""
      }
    ]
  },
  {
    "id": "sentinelone",
    "serviceName": "SentinelOne",
    "image": {
      "src": "/images/services/sentinelone.svg",
      "alt": "SentinelOne"
    },
    "platform": "SentinelOne",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "sentinelone-integration",
        "name": "SentinelOne",
        "description": ""
      }
    ]
  },
  {
    "id": "silverfort",
    "serviceName": "Silverfort",
    "image": {
      "src": "/images/services/silverfort.svg",
      "alt": "Silverfort"
    },
    "platform": "Silverfort",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "silverfort-integration",
        "name": "Silverfort",
        "description": ""
      }
    ]
  },
  {
    "id": "snowflake",
    "serviceName": "Snowflake",
    "image": {
      "src": "/images/services/snowflake.svg",
      "alt": "Snowflake"
    },
    "platform": "Snowflake",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "snowflake-integration",
        "name": "Snowflake",
        "description": ""
      }
    ]
  },
  {
    "id": "splunk",
    "serviceName": "Splunk",
    "image": {
      "src": "/images/services/splunk.svg",
      "alt": "Splunk"
    },
    "platform": "Splunk",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "splunk-integration",
        "name": "Splunk",
        "description": ""
      }
    ]
  },
  {
    "id": "tanium",
    "serviceName": "Tanium",
    "image": {
      "src": "/images/services/tanium.svg",
      "alt": "Tanium"
    },
    "platform": "Tanium",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "tanium-integration",
        "name": "Tanium",
        "description": ""
      }
    ]
  },
  {
    "id": "threatquotient",
    "serviceName": "ThreatQuotient",
    "image": {
      "src": "/images/services/threatquotient.svg",
      "alt": "ThreatQuotient"
    },
    "platform": "ThreatQuotient",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "threatquotient-integration",
        "name": "ThreatQuotient",
        "description": ""
      }
    ]
  },
  {
    "id": "trellix",
    "serviceName": "Trellix",
    "image": {
      "src": "/images/services/trellix.svg",
      "alt": "Trellix"
    },
    "platform": "Trellix",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "trellix-integration",
        "name": "Trellix",
        "description": ""
      }
    ]
  },
  {
    "id": "vectra",
    "serviceName": "Vectra",
    "image": {
      "src": "/images/services/vectra.svg",
      "alt": "Vectra"
    },
    "platform": "Vectra",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "vectra-integration",
        "name": "Vectra",
        "description": ""
      }
    ]
  },
  {
    "id": "virustotal",
    "serviceName": "VirusTotal",
    "image": {
      "src": "/images/services/virustotal.svg",
      "alt": "VirusTotal"
    },
    "platform": "VirusTotal",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "integrations": [
      {
        "id": "virustotal-integration",
        "name": "VirusTotal",
        "description": ""
      }
    ]
  },
  {
    "id": "wiz",
    "serviceName": "Wiz",
    "image": {
      "src": "/images/services/wiz.svg",
      "alt": "Wiz"
    },
    "platform": "Wiz",
    "category": "CSPM, Email Security",
    "categories": [
      "CSPM",
      "Email Security"
    ],
    "integrations": [
      {
        "id": "wiz-integration",
        "name": "Wiz",
        "description": ""
      }
    ]
  },
  {
    "id": "orca-security",
    "serviceName": "Orca Security",
    "image": {
      "src": "/images/services/orca-security.svg",
      "alt": "Orca Security"
    },
    "platform": "Orca Security",
    "category": "CSPM, Cloud Security",
    "categories": [
      "CSPM",
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "orca-security-integration",
        "name": "Orca Security",
        "description": ""
      }
    ]
  },
  {
    "id": "palo-alto-networks-prisma-cloud",
    "serviceName": "Palo Alto Networks Prisma Cloud",
    "image": {
      "src": "/images/services/palo-alto-networks-prisma-cloud.svg",
      "alt": "Palo Alto Networks Prisma Cloud"
    },
    "platform": "Palo Alto Networks Prisma Cloud",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "palo-alto-networks-prisma-cloud-integration",
        "name": "Palo Alto Networks Prisma Cloud",
        "description": ""
      }
    ]
  },
  {
    "id": "check-point-cloudguard",
    "serviceName": "Check Point CloudGuard",
    "image": {
      "src": "/images/services/check-point-cloudguard.svg",
      "alt": "Check Point CloudGuard"
    },
    "platform": "Check Point CloudGuard",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "check-point-cloudguard-integration",
        "name": "Check Point CloudGuard",
        "description": ""
      }
    ]
  },
  {
    "id": "microsoft-defender-for-cloud",
    "serviceName": "Microsoft Defender for Cloud",
    "image": {
      "src": "/images/services/microsoft-defender-for-cloud.svg",
      "alt": "Microsoft Defender for Cloud"
    },
    "platform": "Microsoft Defender for Cloud",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "microsoft-defender-for-cloud-integration",
        "name": "Microsoft Defender for Cloud",
        "description": ""
      }
    ]
  },
  {
    "id": "aws-security-hub",
    "serviceName": "AWS Security Hub",
    "image": {
      "src": "/images/services/aws-security-hub.svg",
      "alt": "AWS Security Hub"
    },
    "platform": "AWS Security Hub",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "aws-security-hub-integration",
        "name": "AWS Security Hub",
        "description": ""
      }
    ]
  },
  {
    "id": "google-security-command-center",
    "serviceName": "Google Security Command Center",
    "image": {
      "src": "/images/services/google-security-command-center.svg",
      "alt": "Google Security Command Center"
    },
    "platform": "Google Security Command Center",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "google-security-command-center-integration",
        "name": "Google Security Command Center",
        "description": ""
      }
    ]
  },
  {
    "id": "tenable-cloud-security",
    "serviceName": "Tenable Cloud Security",
    "image": {
      "src": "/images/services/tenable-cloud-security.svg",
      "alt": "Tenable Cloud Security"
    },
    "platform": "Tenable Cloud Security",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "tenable-cloud-security-integration",
        "name": "Tenable Cloud Security",
        "description": ""
      }
    ]
  },
  {
    "id": "rapid7-insightcloudsec",
    "serviceName": "Rapid7 InsightCloudSec",
    "image": {
      "src": "/images/services/rapid7-insightcloudsec.svg",
      "alt": "Rapid7 InsightCloudSec"
    },
    "platform": "Rapid7 InsightCloudSec",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "rapid7-insightcloudsec-integration",
        "name": "Rapid7 InsightCloudSec",
        "description": ""
      }
    ]
  },
  {
    "id": "qualys-totalcloud",
    "serviceName": "Qualys TotalCloud",
    "image": {
      "src": "/images/services/qualys-totalcloud.svg",
      "alt": "Qualys TotalCloud"
    },
    "platform": "Qualys TotalCloud",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "qualys-totalcloud-integration",
        "name": "Qualys TotalCloud",
        "description": ""
      }
    ]
  },
  {
    "id": "crowdstrike-falcon-cloud-security",
    "serviceName": "CrowdStrike Falcon Cloud Security",
    "image": {
      "src": "/images/services/crowdstrike-falcon-cloud-security.svg",
      "alt": "CrowdStrike Falcon Cloud Security"
    },
    "platform": "CrowdStrike Falcon Cloud Security",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "crowdstrike-falcon-cloud-security-integration",
        "name": "CrowdStrike Falcon Cloud Security",
        "description": ""
      }
    ]
  },
  {
    "id": "lacework-forticnapp",
    "serviceName": "Lacework FortiCNAPP",
    "image": {
      "src": "/images/services/lacework-forticnapp.svg",
      "alt": "Lacework FortiCNAPP"
    },
    "platform": "Lacework FortiCNAPP",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "lacework-forticnapp-integration",
        "name": "Lacework FortiCNAPP",
        "description": ""
      }
    ]
  },
  {
    "id": "aqua-security",
    "serviceName": "Aqua Security",
    "image": {
      "src": "/images/services/aqua-security.svg",
      "alt": "Aqua Security"
    },
    "platform": "Aqua Security",
    "category": "CSPM, IT Operations",
    "categories": [
      "CSPM",
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "aqua-security-integration",
        "name": "Aqua Security",
        "description": ""
      }
    ]
  },
  {
    "id": "zscaler-posture-control",
    "serviceName": "Zscaler Posture Control",
    "image": {
      "src": "/images/services/zscaler-posture-control.svg",
      "alt": "Zscaler Posture Control"
    },
    "platform": "Zscaler Posture Control",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "integrations": [
      {
        "id": "zscaler-posture-control-integration",
        "name": "Zscaler Posture Control",
        "description": ""
      }
    ]
  },
  {
    "id": "kubernetes",
    "serviceName": "Kubernetes",
    "image": {
      "src": "/images/services/kubernetes.svg",
      "alt": "Kubernetes"
    },
    "platform": "Kubernetes",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "kubernetes-integration",
        "name": "Kubernetes",
        "description": ""
      }
    ]
  },
  {
    "id": "1password",
    "serviceName": "1Password",
    "image": {
      "src": "/images/services/1password.svg",
      "alt": "1Password"
    },
    "platform": "1Password",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "1password-integration",
        "name": "1Password",
        "description": ""
      }
    ]
  },
  {
    "id": "samurai-xdr",
    "serviceName": "Samurai XDR",
    "image": {
      "src": "/images/services/samurai-xdr.svg",
      "alt": "Samurai XDR"
    },
    "platform": "Samurai XDR",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "samurai-xdr-integration",
        "name": "Samurai XDR",
        "description": ""
      }
    ]
  },
  {
    "id": "trend-micro",
    "serviceName": "Trend Micro",
    "image": {
      "src": "/images/services/trend-micro.svg",
      "alt": "Trend Micro"
    },
    "platform": "Trend Micro",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "trend-micro-integration",
        "name": "Trend Micro",
        "description": ""
      }
    ]
  },
  {
    "id": "zscaler",
    "serviceName": "Zscaler",
    "image": {
      "src": "/images/services/zscaler.svg",
      "alt": "Zscaler"
    },
    "platform": "Zscaler",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "zscaler-integration",
        "name": "Zscaler",
        "description": ""
      }
    ]
  },
  {
    "id": "zix",
    "serviceName": "Zix",
    "image": {
      "src": "/images/services/zix.svg",
      "alt": "Zix"
    },
    "platform": "Zix",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "zix-integration",
        "name": "Zix",
        "description": ""
      }
    ]
  },
  {
    "id": "votiro",
    "serviceName": "Votiro",
    "image": {
      "src": "/images/services/votiro.svg",
      "alt": "Votiro"
    },
    "platform": "Votiro",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "votiro-integration",
        "name": "Votiro",
        "description": ""
      }
    ]
  },
  {
    "id": "vmray",
    "serviceName": "VMRay",
    "image": {
      "src": "/images/services/vmray.svg",
      "alt": "VMRay"
    },
    "platform": "VMRay",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "vmray-integration",
        "name": "VMRay",
        "description": ""
      }
    ]
  },
  {
    "id": "veeam",
    "serviceName": "Veeam",
    "image": {
      "src": "/images/services/veeam.svg",
      "alt": "Veeam"
    },
    "platform": "Veeam",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "veeam-integration",
        "name": "Veeam",
        "description": ""
      }
    ]
  },
  {
    "id": "tines",
    "serviceName": "Tines",
    "image": {
      "src": "/images/services/tines.svg",
      "alt": "Tines"
    },
    "platform": "Tines",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "tines-integration",
        "name": "Tines",
        "description": ""
      }
    ]
  },
  {
    "id": "tenable",
    "serviceName": "Tenable",
    "image": {
      "src": "/images/services/tenable.svg",
      "alt": "Tenable"
    },
    "platform": "Tenable",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "tenable-integration",
        "name": "Tenable",
        "description": ""
      }
    ]
  },
  {
    "id": "sumo-logic",
    "serviceName": "Sumo Logic",
    "image": {
      "src": "/images/services/sumo-logic.svg",
      "alt": "Sumo Logic"
    },
    "platform": "Sumo Logic",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "sumo-logic-integration",
        "name": "Sumo Logic",
        "description": ""
      }
    ]
  },
  {
    "id": "symantec",
    "serviceName": "Symantec",
    "image": {
      "src": "/images/services/symantec.svg",
      "alt": "Symantec"
    },
    "platform": "Symantec",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "symantec-integration",
        "name": "Symantec",
        "description": ""
      }
    ]
  },
  {
    "id": "slack",
    "serviceName": "Slack",
    "image": {
      "src": "/images/services/slack.svg",
      "alt": "Slack"
    },
    "platform": "Slack",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "integrations": [
      {
        "id": "slack-integration",
        "name": "Slack",
        "description": ""
      }
    ]
  },
  {
    "id": "hackerone",
    "serviceName": "HackerOne",
    "image": {
      "src": "/images/services/hackerone.svg",
      "alt": "HackerOne"
    },
    "platform": "HackerOne",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "hackerone-integration",
        "name": "HackerOne",
        "description": ""
      }
    ]
  },
  {
    "id": "honeywell",
    "serviceName": "Honeywell",
    "image": {
      "src": "/images/services/honeywell.svg",
      "alt": "Honeywell"
    },
    "platform": "Honeywell",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "honeywell-integration",
        "name": "Honeywell",
        "description": ""
      }
    ]
  },
  {
    "id": "ibm",
    "serviceName": "IBM",
    "image": {
      "src": "/images/services/ibm.svg",
      "alt": "IBM"
    },
    "platform": "IBM",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "ibm-integration",
        "name": "IBM",
        "description": ""
      }
    ]
  },
  {
    "id": "joe-sandbox",
    "serviceName": "Joe Sandbox",
    "image": {
      "src": "/images/services/joe-sandbox.svg",
      "alt": "Joe Sandbox"
    },
    "platform": "Joe Sandbox",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "joe-sandbox-integration",
        "name": "Joe Sandbox",
        "description": ""
      }
    ]
  },
  {
    "id": "jupiterone",
    "serviceName": "JupiterOne",
    "image": {
      "src": "/images/services/jupiterone.svg",
      "alt": "JupiterOne"
    },
    "platform": "JupiterOne",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "jupiterone-integration",
        "name": "JupiterOne",
        "description": ""
      }
    ]
  },
  {
    "id": "kivera",
    "serviceName": "Kivera",
    "image": {
      "src": "/images/services/kivera.svg",
      "alt": "Kivera"
    },
    "platform": "Kivera",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "kivera-integration",
        "name": "Kivera",
        "description": ""
      }
    ]
  },
  {
    "id": "logrhythm",
    "serviceName": "LogRhythm",
    "image": {
      "src": "/images/services/logrhythm.svg",
      "alt": "LogRhythm"
    },
    "platform": "LogRhythm",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "logrhythm-integration",
        "name": "LogRhythm",
        "description": ""
      }
    ]
  },
  {
    "id": "mandiant",
    "serviceName": "Mandiant",
    "image": {
      "src": "/images/services/mandiant.svg",
      "alt": "Mandiant"
    },
    "platform": "Mandiant",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "mandiant-integration",
        "name": "Mandiant",
        "description": ""
      }
    ]
  },
  {
    "id": "micro-focus",
    "serviceName": "Micro Focus",
    "image": {
      "src": "/images/services/micro-focus.svg",
      "alt": "Micro Focus"
    },
    "platform": "Micro Focus",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "micro-focus-integration",
        "name": "Micro Focus",
        "description": ""
      }
    ]
  },
  {
    "id": "mimecast",
    "serviceName": "Mimecast",
    "image": {
      "src": "/images/services/mimecast.svg",
      "alt": "Mimecast"
    },
    "platform": "Mimecast",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "mimecast-integration",
        "name": "Mimecast",
        "description": ""
      }
    ]
  },
  {
    "id": "netskope",
    "serviceName": "Netskope",
    "image": {
      "src": "/images/services/netskope.svg",
      "alt": "Netskope"
    },
    "platform": "Netskope",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "netskope-integration",
        "name": "Netskope",
        "description": ""
      }
    ]
  },
  {
    "id": "ocsf",
    "serviceName": "OCSF",
    "image": {
      "src": "/images/services/ocsf.svg",
      "alt": "OCSF"
    },
    "platform": "OCSF",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "ocsf-integration",
        "name": "OCSF",
        "description": ""
      }
    ]
  },
  {
    "id": "oracle",
    "serviceName": "Oracle",
    "image": {
      "src": "/images/services/oracle.svg",
      "alt": "Oracle"
    },
    "platform": "Oracle",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "oracle-integration",
        "name": "Oracle",
        "description": ""
      }
    ]
  },
  {
    "id": "pagerduty",
    "serviceName": "PagerDuty",
    "image": {
      "src": "/images/services/pagerduty.svg",
      "alt": "PagerDuty"
    },
    "platform": "PagerDuty",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "pagerduty-integration",
        "name": "PagerDuty",
        "description": ""
      }
    ]
  },
  {
    "id": "pingone",
    "serviceName": "PingOne",
    "image": {
      "src": "/images/services/pingone.svg",
      "alt": "PingOne"
    },
    "platform": "PingOne",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "integrations": [
      {
        "id": "pingone-integration",
        "name": "PingOne",
        "description": ""
      }
    ]
  },
  {
    "id": "alienvault",
    "serviceName": "AlienVault",
    "image": {
      "src": "/images/services/alienvault.svg",
      "alt": "AlienVault"
    },
    "platform": "AlienVault",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "alienvault-integration",
        "name": "AlienVault",
        "description": ""
      }
    ]
  },
  {
    "id": "analyst1",
    "serviceName": "Analyst1",
    "image": {
      "src": "/images/services/analyst1.svg",
      "alt": "Analyst1"
    },
    "platform": "Analyst1",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "analyst1-integration",
        "name": "Analyst1",
        "description": ""
      }
    ]
  },
  {
    "id": "aruba",
    "serviceName": "Aruba",
    "image": {
      "src": "/images/services/aruba.svg",
      "alt": "Aruba"
    },
    "platform": "Aruba",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "aruba-integration",
        "name": "Aruba",
        "description": ""
      }
    ]
  },
  {
    "id": "at-t",
    "serviceName": "AT&T",
    "image": {
      "src": "/images/services/at-t.svg",
      "alt": "AT&T"
    },
    "platform": "AT&T",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "at-t-integration",
        "name": "AT&T",
        "description": ""
      }
    ]
  },
  {
    "id": "attackiq",
    "serviceName": "AttackIQ",
    "image": {
      "src": "/images/services/attackiq.svg",
      "alt": "AttackIQ"
    },
    "platform": "AttackIQ",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "attackiq-integration",
        "name": "AttackIQ",
        "description": ""
      }
    ]
  },
  {
    "id": "automox",
    "serviceName": "Automox",
    "image": {
      "src": "/images/services/automox.svg",
      "alt": "Automox"
    },
    "platform": "Automox",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "automox-integration",
        "name": "Automox",
        "description": ""
      }
    ]
  },
  {
    "id": "blackberry",
    "serviceName": "BlackBerry",
    "image": {
      "src": "/images/services/blackberry.svg",
      "alt": "BlackBerry"
    },
    "platform": "BlackBerry",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "blackberry-integration",
        "name": "BlackBerry",
        "description": ""
      }
    ]
  },
  {
    "id": "box",
    "serviceName": "Box",
    "image": {
      "src": "/images/services/box.svg",
      "alt": "Box"
    },
    "platform": "Box",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "box-integration",
        "name": "Box",
        "description": ""
      }
    ]
  },
  {
    "id": "cisco",
    "serviceName": "Cisco",
    "image": {
      "src": "/images/services/cisco.svg",
      "alt": "Cisco"
    },
    "platform": "Cisco",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "cisco-integration",
        "name": "Cisco",
        "description": ""
      }
    ]
  },
  {
    "id": "cribl",
    "serviceName": "Cribl",
    "image": {
      "src": "/images/services/cribl.svg",
      "alt": "Cribl"
    },
    "platform": "Cribl",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "cribl-integration",
        "name": "Cribl",
        "description": ""
      }
    ]
  },
  {
    "id": "crowdstrike",
    "serviceName": "CrowdStrike",
    "image": {
      "src": "/images/services/crowdstrike.svg",
      "alt": "CrowdStrike"
    },
    "platform": "CrowdStrike",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "crowdstrike-integration",
        "name": "CrowdStrike",
        "description": ""
      }
    ]
  },
  {
    "id": "cyberark",
    "serviceName": "CyberArk",
    "image": {
      "src": "/images/services/cyberark.svg",
      "alt": "CyberArk"
    },
    "platform": "CyberArk",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "cyberark-integration",
        "name": "CyberArk",
        "description": ""
      }
    ]
  },
  {
    "id": "cycognito",
    "serviceName": "CyCognito",
    "image": {
      "src": "/images/services/cycognito.svg",
      "alt": "CyCognito"
    },
    "platform": "CyCognito",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "cycognito-integration",
        "name": "CyCognito",
        "description": ""
      }
    ]
  },
  {
    "id": "cylus",
    "serviceName": "Cylus",
    "image": {
      "src": "/images/services/cylus.svg",
      "alt": "Cylus"
    },
    "platform": "Cylus",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "integrations": [
      {
        "id": "cylus-integration",
        "name": "Cylus",
        "description": ""
      }
    ]
  },
  {
    "id": "beyondtrust",
    "serviceName": "BeyondTrust",
    "image": {
      "src": "/images/services/beyondtrust.svg",
      "alt": "BeyondTrust"
    },
    "platform": "BeyondTrust",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "beyondtrust-integration",
        "name": "BeyondTrust",
        "description": ""
      }
    ]
  },
  {
    "id": "auth0",
    "serviceName": "Auth0",
    "image": {
      "src": "/images/services/auth0.svg",
      "alt": "Auth0"
    },
    "platform": "Auth0",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "auth0-integration",
        "name": "Auth0",
        "description": ""
      }
    ]
  },
  {
    "id": "atlassian",
    "serviceName": "Atlassian",
    "image": {
      "src": "/images/services/atlassian.svg",
      "alt": "Atlassian"
    },
    "platform": "Atlassian",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "atlassian-integration",
        "name": "Atlassian",
        "description": ""
      }
    ]
  },
  {
    "id": "at-bay",
    "serviceName": "At-Bay",
    "image": {
      "src": "/images/services/at-bay.svg",
      "alt": "At-Bay"
    },
    "platform": "At-Bay",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "at-bay-integration",
        "name": "At-Bay",
        "description": ""
      }
    ]
  },
  {
    "id": "armis",
    "serviceName": "Armis",
    "image": {
      "src": "/images/services/armis.svg",
      "alt": "Armis"
    },
    "platform": "Armis",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "armis-integration",
        "name": "Armis",
        "description": ""
      }
    ]
  },
  {
    "id": "anomali",
    "serviceName": "Anomali",
    "image": {
      "src": "/images/services/anomali.svg",
      "alt": "Anomali"
    },
    "platform": "Anomali",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "anomali-integration",
        "name": "Anomali",
        "description": ""
      }
    ]
  },
  {
    "id": "amazon",
    "serviceName": "Amazon",
    "image": {
      "src": "/images/services/amazon.svg",
      "alt": "Amazon"
    },
    "platform": "Amazon",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "amazon-integration",
        "name": "Amazon",
        "description": ""
      }
    ]
  },
  {
    "id": "alien-labs-otx",
    "serviceName": "Alien Labs OTX",
    "image": {
      "src": "/images/services/alien-labs-otx.svg",
      "alt": "Alien Labs OTX"
    },
    "platform": "Alien Labs OTX",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "alien-labs-otx-integration",
        "name": "Alien Labs OTX",
        "description": ""
      }
    ]
  },
  {
    "id": "abuseipdb",
    "serviceName": "AbuseIPDB",
    "image": {
      "src": "/images/services/abuseipdb.svg",
      "alt": "AbuseIPDB"
    },
    "platform": "AbuseIPDB",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "abuseipdb-integration",
        "name": "AbuseIPDB",
        "description": ""
      }
    ]
  },
  {
    "id": "42gears",
    "serviceName": "42Gears",
    "image": {
      "src": "/images/services/42gears.svg",
      "alt": "42Gears"
    },
    "platform": "42Gears",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "42gears-integration",
        "name": "42Gears",
        "description": ""
      }
    ]
  },
  {
    "id": "aims",
    "serviceName": "AIMS",
    "image": {
      "src": "/images/services/aims.svg",
      "alt": "AIMS"
    },
    "platform": "AIMS",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "integrations": [
      {
        "id": "aims-integration",
        "name": "AIMS",
        "description": ""
      }
    ]
  },
  {
    "id": "bluecat-networks",
    "serviceName": "BlueCat Networks",
    "image": {
      "src": "/images/services/bluecat-networks.svg",
      "alt": "BlueCat Networks"
    },
    "platform": "BlueCat Networks",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "bluecat-networks-integration",
        "name": "BlueCat Networks",
        "description": ""
      }
    ]
  },
  {
    "id": "check-point",
    "serviceName": "Check Point",
    "image": {
      "src": "/images/services/check-point.svg",
      "alt": "Check Point"
    },
    "platform": "Check Point",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "check-point-integration",
        "name": "Check Point",
        "description": ""
      }
    ]
  },
  {
    "id": "cloudflare",
    "serviceName": "Cloudflare",
    "image": {
      "src": "/images/services/cloudflare.svg",
      "alt": "Cloudflare"
    },
    "platform": "Cloudflare",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "cloudflare-integration",
        "name": "Cloudflare",
        "description": ""
      }
    ]
  },
  {
    "id": "criminal-ip",
    "serviceName": "Criminal IP",
    "image": {
      "src": "/images/services/criminal-ip.svg",
      "alt": "Criminal IP"
    },
    "platform": "Criminal IP",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "criminal-ip-integration",
        "name": "Criminal IP",
        "description": ""
      }
    ]
  },
  {
    "id": "cybereason",
    "serviceName": "Cybereason",
    "image": {
      "src": "/images/services/cybereason.svg",
      "alt": "Cybereason"
    },
    "platform": "Cybereason",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "cybereason-integration",
        "name": "Cybereason",
        "description": ""
      }
    ]
  },
  {
    "id": "darktrace",
    "serviceName": "Darktrace",
    "image": {
      "src": "/images/services/darktrace.svg",
      "alt": "Darktrace"
    },
    "platform": "Darktrace",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "darktrace-integration",
        "name": "Darktrace",
        "description": ""
      }
    ]
  },
  {
    "id": "docker",
    "serviceName": "Docker",
    "image": {
      "src": "/images/services/docker.svg",
      "alt": "Docker"
    },
    "platform": "Docker",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "docker-integration",
        "name": "Docker",
        "description": ""
      }
    ]
  },
  {
    "id": "exabeam",
    "serviceName": "Exabeam",
    "image": {
      "src": "/images/services/exabeam.svg",
      "alt": "Exabeam"
    },
    "platform": "Exabeam",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "exabeam-integration",
        "name": "Exabeam",
        "description": ""
      }
    ]
  },
  {
    "id": "f5-distributed-cloud-services",
    "serviceName": "F5 Distributed Cloud Services",
    "image": {
      "src": "/images/services/f5-distributed-cloud-services.svg",
      "alt": "F5 Distributed Cloud Services"
    },
    "platform": "F5 Distributed Cloud Services",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "f5-distributed-cloud-services-integration",
        "name": "F5 Distributed Cloud Services",
        "description": ""
      }
    ]
  },
  {
    "id": "forescout",
    "serviceName": "Forescout",
    "image": {
      "src": "/images/services/forescout.svg",
      "alt": "Forescout"
    },
    "platform": "Forescout",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "forescout-integration",
        "name": "Forescout",
        "description": ""
      }
    ]
  },
  {
    "id": "graylog",
    "serviceName": "Graylog",
    "image": {
      "src": "/images/services/graylog.svg",
      "alt": "Graylog"
    },
    "platform": "Graylog",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "graylog-integration",
        "name": "Graylog",
        "description": ""
      }
    ]
  },
  {
    "id": "hashicorp",
    "serviceName": "HashiCorp",
    "image": {
      "src": "/images/services/hashicorp.svg",
      "alt": "HashiCorp"
    },
    "platform": "HashiCorp",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "hashicorp-integration",
        "name": "HashiCorp",
        "description": ""
      }
    ]
  },
  {
    "id": "hp",
    "serviceName": "HP",
    "image": {
      "src": "/images/services/hp.svg",
      "alt": "HP"
    },
    "platform": "HP",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "hp-integration",
        "name": "HP",
        "description": ""
      }
    ]
  },
  {
    "id": "infoblox",
    "serviceName": "Infoblox",
    "image": {
      "src": "/images/services/infoblox.svg",
      "alt": "Infoblox"
    },
    "platform": "Infoblox",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "infoblox-integration",
        "name": "Infoblox",
        "description": ""
      }
    ]
  },
  {
    "id": "jumpcloud",
    "serviceName": "JumpCloud",
    "image": {
      "src": "/images/services/jumpcloud.svg",
      "alt": "JumpCloud"
    },
    "platform": "JumpCloud",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "integrations": [
      {
        "id": "jumpcloud-integration",
        "name": "JumpCloud",
        "description": ""
      }
    ]
  },
  {
    "id": "keeper-security",
    "serviceName": "Keeper Security",
    "image": {
      "src": "/images/services/keeper-security.svg",
      "alt": "Keeper Security"
    },
    "platform": "Keeper Security",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "keeper-security-integration",
        "name": "Keeper Security",
        "description": ""
      }
    ]
  },
  {
    "id": "lacework",
    "serviceName": "Lacework",
    "image": {
      "src": "/images/services/lacework.svg",
      "alt": "Lacework"
    },
    "platform": "Lacework",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "lacework-integration",
        "name": "Lacework",
        "description": ""
      }
    ]
  },
  {
    "id": "malwarebytes",
    "serviceName": "Malwarebytes",
    "image": {
      "src": "/images/services/malwarebytes.svg",
      "alt": "Malwarebytes"
    },
    "platform": "Malwarebytes",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "malwarebytes-integration",
        "name": "Malwarebytes",
        "description": ""
      }
    ]
  },
  {
    "id": "mattermost",
    "serviceName": "Mattermost",
    "image": {
      "src": "/images/services/mattermost.svg",
      "alt": "Mattermost"
    },
    "platform": "Mattermost",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "mattermost-integration",
        "name": "Mattermost",
        "description": ""
      }
    ]
  },
  {
    "id": "microsoft",
    "serviceName": "Microsoft",
    "image": {
      "src": "/images/services/microsoft.svg",
      "alt": "Microsoft"
    },
    "platform": "Microsoft",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "microsoft-integration",
        "name": "Microsoft",
        "description": ""
      }
    ]
  },
  {
    "id": "misp-tip",
    "serviceName": "MISP TIP",
    "image": {
      "src": "/images/services/misp-tip.svg",
      "alt": "MISP TIP"
    },
    "platform": "MISP TIP",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "misp-tip-integration",
        "name": "MISP TIP",
        "description": ""
      }
    ]
  },
  {
    "id": "oauth",
    "serviceName": "OAuth",
    "image": {
      "src": "/images/services/oauth.svg",
      "alt": "OAuth"
    },
    "platform": "OAuth",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "oauth-integration",
        "name": "OAuth",
        "description": ""
      }
    ]
  },
  {
    "id": "okta",
    "serviceName": "Okta",
    "image": {
      "src": "/images/services/okta.svg",
      "alt": "Okta"
    },
    "platform": "Okta",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "okta-integration",
        "name": "Okta",
        "description": ""
      }
    ]
  },
  {
    "id": "palo-alto-networks",
    "serviceName": "Palo Alto Networks",
    "image": {
      "src": "/images/services/palo-alto-networks.svg",
      "alt": "Palo Alto Networks"
    },
    "platform": "Palo Alto Networks",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "palo-alto-networks-integration",
        "name": "Palo Alto Networks",
        "description": ""
      }
    ]
  },
  {
    "id": "prometheus",
    "serviceName": "Prometheus",
    "image": {
      "src": "/images/services/prometheus.svg",
      "alt": "Prometheus"
    },
    "platform": "Prometheus",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "integrations": [
      {
        "id": "prometheus-integration",
        "name": "Prometheus",
        "description": ""
      }
    ]
  }
];
