import type { Integration } from "@/features/integrations/types";

/** Imported from tests/Platform List.xlsx. Names and category assignments are preserved.
 * The workbook does not supply logos, integration titles, or descriptions.
 * Platform names serve as integration labels; descriptions remain empty.
 * Supplied company images are used when matched; colored SVGs are fallbacks.
 * Regenerate with: python scripts/import-platforms.py
 */
export const integrationCatalog: Integration[] = [
  {
    "id": "qualys",
    "serviceName": "Qualys",
    "image": {
      "src": "/companies/Qualys_b5822dab3b.png",
      "alt": "Qualys platform integration listed under Threat Intelligence"
    },
    "platform": "Qualys",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#741b1b",
      "background": "#fcf3f3",
      "border": "#e4bebe"
    },
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
      "src": "/companies/Radiflow_f08739431c.png",
      "alt": "Radiflow platform integration listed under Threat Intelligence"
    },
    "platform": "Radiflow",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#1b3574",
      "background": "#f3f6fc",
      "border": "#bec9e4"
    },
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
      "alt": "Recorded Future platform integration listed under Threat Intelligence"
    },
    "platform": "Recorded Future",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#4f741b",
      "background": "#f8fcf3",
      "border": "#d4e4be"
    },
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
      "alt": "Reftab platform integration listed under Threat Intelligence"
    },
    "platform": "Reftab",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#741b69",
      "background": "#fcf3fb",
      "border": "#e4bee0"
    },
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
      "alt": "Remediant platform integration listed under Threat Intelligence"
    },
    "platform": "Remediant",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#1b7465",
      "background": "#f3fcfa",
      "border": "#bee4de"
    },
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
      "src": "/companies/Safe_Breach_1_8bc0dc5da0.png",
      "alt": "SafeBreach platform integration listed under Threat Intelligence"
    },
    "platform": "SafeBreach",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#744b1b",
      "background": "#fcf8f3",
      "border": "#e4d3be"
    },
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
      "src": "/companies/Sentinel_One_3da768e055.png",
      "alt": "SentinelOne platform integration listed under Threat Intelligence"
    },
    "platform": "SentinelOne",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#311b74",
      "background": "#f5f3fc",
      "border": "#c7bee4"
    },
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
      "src": "/companies/Silver_Fort_cf0453128c.png",
      "alt": "Silverfort platform integration listed under Threat Intelligence"
    },
    "platform": "Silverfort",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#1f741b",
      "background": "#f4fcf3",
      "border": "#bfe4be"
    },
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
      "alt": "Snowflake platform integration listed under Threat Intelligence"
    },
    "platform": "Snowflake",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#741b39",
      "background": "#fcf3f6",
      "border": "#e4becb"
    },
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
      "src": "/companies/Splunk_f8605e6a71.png",
      "alt": "Splunk platform integration listed under Threat Intelligence"
    },
    "platform": "Splunk",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#1b5374",
      "background": "#f3f8fc",
      "border": "#bed6e4"
    },
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
      "src": "/companies/Tanium_1_a493c87d69.png",
      "alt": "Tanium platform integration listed under Threat Intelligence"
    },
    "platform": "Tanium",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#6c741b",
      "background": "#fbfcf3",
      "border": "#e1e4be"
    },
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
      "src": "/companies/Threat_Quotient_815e163598.png",
      "alt": "ThreatQuotient platform integration listed under Threat Intelligence"
    },
    "platform": "ThreatQuotient",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#611b74",
      "background": "#faf3fc",
      "border": "#dcbee4"
    },
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
      "src": "/companies/Trellix_032c6b8a24.png",
      "alt": "Trellix platform integration listed under Threat Intelligence"
    },
    "platform": "Trellix",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#1b7447",
      "background": "#f3fcf7",
      "border": "#bee4d1"
    },
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
      "src": "/companies/Vectra_cf10f1c30c.png",
      "alt": "Vectra platform integration listed under Threat Intelligence"
    },
    "platform": "Vectra",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#742d1b",
      "background": "#fcf5f3",
      "border": "#e4c6be"
    },
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
      "alt": "VirusTotal platform integration listed under Threat Intelligence"
    },
    "platform": "VirusTotal",
    "category": "Threat Intelligence",
    "categories": [
      "Threat Intelligence"
    ],
    "palette": {
      "foreground": "#1b2374",
      "background": "#f3f4fc",
      "border": "#bec1e4"
    },
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
      "src": "/companies/Wiz_1_feefb1b6ba.png",
      "alt": "Wiz platform integration listed under CSPM and Email Security"
    },
    "platform": "Wiz",
    "category": "CSPM, Email Security",
    "categories": [
      "CSPM",
      "Email Security"
    ],
    "palette": {
      "foreground": "#3d741b",
      "background": "#f6fcf3",
      "border": "#cce4be"
    },
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
      "src": "/companies/Orca_Security_d259f67c28.png",
      "alt": "Orca Security platform integration listed under CSPM and Cloud Security"
    },
    "platform": "Orca Security",
    "category": "CSPM, Cloud Security",
    "categories": [
      "CSPM",
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#741b56",
      "background": "#fcf3f9",
      "border": "#e4bed8"
    },
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
      "src": "/companies/Palo_Alto_Networks_0c29017a03.png",
      "alt": "Palo Alto Networks Prisma Cloud platform integration listed under CSPM"
    },
    "platform": "Palo Alto Networks Prisma Cloud",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#1b7074",
      "background": "#f3fbfc",
      "border": "#bee3e4"
    },
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
      "src": "/companies/Checkpoint_379f9eb3c1.png",
      "alt": "Check Point CloudGuard platform integration listed under CSPM"
    },
    "platform": "Check Point CloudGuard",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#745d1b",
      "background": "#fcf9f3",
      "border": "#e4dbbe"
    },
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
      "src": "/companies/Microsoft_bd16e6984a.png",
      "alt": "Microsoft Defender for Cloud platform integration listed under CSPM"
    },
    "platform": "Microsoft Defender for Cloud",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#431b74",
      "background": "#f7f3fc",
      "border": "#cfbee4"
    },
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
      "alt": "AWS Security Hub platform integration listed under CSPM"
    },
    "platform": "AWS Security Hub",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#1b742a",
      "background": "#f3fcf5",
      "border": "#bee4c4"
    },
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
      "src": "/companies/Google_0ecda69f85.png",
      "alt": "Google Security Command Center platform integration listed under CSPM"
    },
    "platform": "Google Security Command Center",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#741b26",
      "background": "#fcf3f4",
      "border": "#e4bec3"
    },
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
      "src": "/companies/Tenable_2c634cc32c.png",
      "alt": "Tenable Cloud Security platform integration listed under CSPM"
    },
    "platform": "Tenable Cloud Security",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#1b4074",
      "background": "#f3f7fc",
      "border": "#becee4"
    },
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
      "src": "/companies/Rapid7_3169567e26.png",
      "alt": "Rapid7 InsightCloudSec platform integration listed under CSPM"
    },
    "platform": "Rapid7 InsightCloudSec",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#5a741b",
      "background": "#f9fcf3",
      "border": "#d9e4be"
    },
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
      "src": "/companies/Qualys_b5822dab3b.png",
      "alt": "Qualys TotalCloud platform integration listed under CSPM"
    },
    "platform": "Qualys TotalCloud",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#731b74",
      "background": "#fcf3fc",
      "border": "#e4bee4"
    },
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
      "alt": "CrowdStrike Falcon Cloud Security platform integration listed under CSPM"
    },
    "platform": "CrowdStrike Falcon Cloud Security",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#1b745a",
      "background": "#f3fcf9",
      "border": "#bee4d9"
    },
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
      "src": "/companies/Lace_Work_52d9ccb7dd.png",
      "alt": "Lacework FortiCNAPP platform integration listed under CSPM"
    },
    "platform": "Lacework FortiCNAPP",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#74401b",
      "background": "#fcf7f3",
      "border": "#e4cebe"
    },
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
      "alt": "Aqua Security platform integration listed under CSPM and IT Operations"
    },
    "platform": "Aqua Security",
    "category": "CSPM, IT Operations",
    "categories": [
      "CSPM",
      "IT Operations"
    ],
    "palette": {
      "foreground": "#261b74",
      "background": "#f4f3fc",
      "border": "#c3bee4"
    },
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
      "src": "/companies/Zscaler_1b4142cede.png",
      "alt": "Zscaler Posture Control platform integration listed under CSPM"
    },
    "platform": "Zscaler Posture Control",
    "category": "CSPM",
    "categories": [
      "CSPM"
    ],
    "palette": {
      "foreground": "#2a741b",
      "background": "#f5fcf3",
      "border": "#c4e4be"
    },
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
      "alt": "Kubernetes platform integration listed under Email Security"
    },
    "platform": "Kubernetes",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#741b44",
      "background": "#fcf3f7",
      "border": "#e4bed0"
    },
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
      "alt": "1Password platform integration listed under Email Security"
    },
    "platform": "1Password",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#1b5e74",
      "background": "#f3f9fc",
      "border": "#bedbe4"
    },
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
      "alt": "Samurai XDR platform integration listed under Email Security"
    },
    "platform": "Samurai XDR",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#74701b",
      "background": "#fcfbf3",
      "border": "#e4e3be"
    },
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
      "src": "/companies/Trend_Micro_06bdc6bbbf.png",
      "alt": "Trend Micro platform integration listed under Email Security"
    },
    "platform": "Trend Micro",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#561b74",
      "background": "#f9f3fc",
      "border": "#d7bee4"
    },
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
      "src": "/companies/Zscaler_1b4142cede.png",
      "alt": "Zscaler platform integration listed under Email Security"
    },
    "platform": "Zscaler",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#1b743c",
      "background": "#f3fcf6",
      "border": "#bee4cc"
    },
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
      "alt": "Zix platform integration listed under Email Security"
    },
    "platform": "Zix",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#74221b",
      "background": "#fcf4f3",
      "border": "#e4c1be"
    },
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
      "src": "/companies/Votiro_17ec68d9ed.png",
      "alt": "Votiro platform integration listed under Email Security"
    },
    "platform": "Votiro",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#1b2e74",
      "background": "#f3f5fc",
      "border": "#bec6e4"
    },
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
      "src": "/companies/VMRAY_e2c14f58bf.png",
      "alt": "VMRay platform integration listed under Email Security"
    },
    "platform": "VMRay",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#48741b",
      "background": "#f7fcf3",
      "border": "#d1e4be"
    },
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
      "alt": "Veeam platform integration listed under Email Security"
    },
    "platform": "Veeam",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#741b62",
      "background": "#fcf3fa",
      "border": "#e4bedd"
    },
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
      "alt": "Tines platform integration listed under Email Security"
    },
    "platform": "Tines",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#1b746c",
      "background": "#f3fcfb",
      "border": "#bee4e1"
    },
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
      "src": "/companies/Tenable_2c634cc32c.png",
      "alt": "Tenable platform integration listed under Email Security"
    },
    "platform": "Tenable",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#74521b",
      "background": "#fcf8f3",
      "border": "#e4d6be"
    },
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
      "alt": "Sumo Logic platform integration listed under Email Security"
    },
    "platform": "Sumo Logic",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#381b74",
      "background": "#f6f3fc",
      "border": "#cabee4"
    },
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
      "alt": "Symantec platform integration listed under Email Security"
    },
    "platform": "Symantec",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#1b741e",
      "background": "#f3fcf3",
      "border": "#bee4bf"
    },
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
      "alt": "Slack platform integration listed under Email Security"
    },
    "platform": "Slack",
    "category": "Email Security",
    "categories": [
      "Email Security"
    ],
    "palette": {
      "foreground": "#741b32",
      "background": "#fcf3f5",
      "border": "#e4bec8"
    },
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
      "src": "/companies/Hacker_One_b26ee5030e.png",
      "alt": "HackerOne platform integration listed under CNAPP"
    },
    "platform": "HackerOne",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#1b4c74",
      "background": "#f3f8fc",
      "border": "#bed3e4"
    },
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
      "src": "/companies/Honeywell_1_0978a24906.png",
      "alt": "Honeywell platform integration listed under CNAPP"
    },
    "platform": "Honeywell",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#65741b",
      "background": "#fafcf3",
      "border": "#dee4be"
    },
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
      "src": "/companies/IBM_3275dda984.png",
      "alt": "IBM platform integration listed under CNAPP"
    },
    "platform": "IBM",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#681b74",
      "background": "#faf3fc",
      "border": "#dfbee4"
    },
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
      "alt": "Joe Sandbox platform integration listed under CNAPP"
    },
    "platform": "Joe Sandbox",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#1b744e",
      "background": "#f3fcf8",
      "border": "#bee4d4"
    },
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
      "src": "/companies/Jupiter_One_deb5577165.png",
      "alt": "JupiterOne platform integration listed under CNAPP"
    },
    "platform": "JupiterOne",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#74341b",
      "background": "#fcf6f3",
      "border": "#e4c9be"
    },
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
      "alt": "Kivera platform integration listed under CNAPP"
    },
    "platform": "Kivera",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#1b1c74",
      "background": "#f3f3fc",
      "border": "#bebee4"
    },
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
      "src": "/companies/Log_Rhythm_a734e41ced.png",
      "alt": "LogRhythm platform integration listed under CNAPP"
    },
    "platform": "LogRhythm",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#36741b",
      "background": "#f6fcf3",
      "border": "#c9e4be"
    },
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
      "src": "/companies/Mandiant_a5e8e2bfe8.png",
      "alt": "Mandiant platform integration listed under CNAPP"
    },
    "platform": "Mandiant",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#741b4f",
      "background": "#fcf3f8",
      "border": "#e4bed5"
    },
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
      "alt": "Micro Focus platform integration listed under CNAPP"
    },
    "platform": "Micro Focus",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#1b6974",
      "background": "#f3fbfc",
      "border": "#bee0e4"
    },
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
      "src": "/companies/Mimecast_261052687b.png",
      "alt": "Mimecast platform integration listed under CNAPP"
    },
    "platform": "Mimecast",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#74641b",
      "background": "#fcfaf3",
      "border": "#e4debe"
    },
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
      "src": "/companies/Netskope_f158d46600.png",
      "alt": "Netskope platform integration listed under CNAPP"
    },
    "platform": "Netskope",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#4a1b74",
      "background": "#f8f3fc",
      "border": "#d2bee4"
    },
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
      "alt": "OCSF platform integration listed under CNAPP"
    },
    "platform": "OCSF",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#1b7431",
      "background": "#f3fcf5",
      "border": "#bee4c7"
    },
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
      "src": "/companies/Oracle_cbacf8c8bb.png",
      "alt": "Oracle platform integration listed under CNAPP"
    },
    "platform": "Oracle",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#741b1f",
      "background": "#fcf3f4",
      "border": "#e4bec0"
    },
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
      "alt": "PagerDuty platform integration listed under CNAPP"
    },
    "platform": "PagerDuty",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#1b3974",
      "background": "#f3f6fc",
      "border": "#becbe4"
    },
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
      "alt": "PingOne platform integration listed under CNAPP"
    },
    "platform": "PingOne",
    "category": "CNAPP",
    "categories": [
      "CNAPP"
    ],
    "palette": {
      "foreground": "#53741b",
      "background": "#f8fcf3",
      "border": "#d6e4be"
    },
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
      "alt": "AlienVault platform integration listed under IT Operations"
    },
    "platform": "AlienVault",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#741b6d",
      "background": "#fcf3fb",
      "border": "#e4bee1"
    },
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
      "alt": "Analyst1 platform integration listed under IT Operations"
    },
    "platform": "Analyst1",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#1b7461",
      "background": "#f3fcfa",
      "border": "#bee4dc"
    },
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
      "src": "/companies/Aruba_c25a6c32b0.png",
      "alt": "Aruba platform integration listed under IT Operations"
    },
    "platform": "Aruba",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#74471b",
      "background": "#fcf7f3",
      "border": "#e4d1be"
    },
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
      "alt": "AT&T platform integration listed under IT Operations"
    },
    "platform": "AT&T",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#2d1b74",
      "background": "#f5f3fc",
      "border": "#c6bee4"
    },
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
      "src": "/companies/Attack_IQ_fdc8b6d32e.png",
      "alt": "AttackIQ platform integration listed under IT Operations"
    },
    "platform": "AttackIQ",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#23741b",
      "background": "#f4fcf3",
      "border": "#c1e4be"
    },
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
      "alt": "Automox platform integration listed under IT Operations"
    },
    "platform": "Automox",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#741b3d",
      "background": "#fcf3f6",
      "border": "#e4becd"
    },
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
      "alt": "BlackBerry platform integration listed under IT Operations"
    },
    "platform": "BlackBerry",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#1b5774",
      "background": "#f3f9fc",
      "border": "#bed8e4"
    },
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
      "alt": "Box platform integration listed under IT Operations"
    },
    "platform": "Box",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#71741b",
      "background": "#fbfcf3",
      "border": "#e3e4be"
    },
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
      "src": "/companies/Cisco_cc51ff8d4b.png",
      "alt": "Cisco platform integration listed under IT Operations"
    },
    "platform": "Cisco",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#5d1b74",
      "background": "#f9f3fc",
      "border": "#dabee4"
    },
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
      "alt": "Cribl platform integration listed under IT Operations"
    },
    "platform": "Cribl",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#1b7443",
      "background": "#f3fcf7",
      "border": "#bee4cf"
    },
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
      "alt": "CrowdStrike platform integration listed under IT Operations"
    },
    "platform": "CrowdStrike",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#74291b",
      "background": "#fcf4f3",
      "border": "#e4c4be"
    },
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
      "src": "/companies/Cyberark_1f958a18c7.png",
      "alt": "CyberArk platform integration listed under IT Operations"
    },
    "platform": "CyberArk",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#1b2774",
      "background": "#f3f4fc",
      "border": "#bec3e4"
    },
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
      "src": "/companies/Cy_Cognito_6bb35cb74a.png",
      "alt": "CyCognito platform integration listed under IT Operations"
    },
    "platform": "CyCognito",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#41741b",
      "background": "#f7fcf3",
      "border": "#cee4be"
    },
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
      "src": "/companies/Cylus_a16172c8e9.png",
      "alt": "Cylus platform integration listed under IT Operations"
    },
    "platform": "Cylus",
    "category": "IT Operations",
    "categories": [
      "IT Operations"
    ],
    "palette": {
      "foreground": "#741b5b",
      "background": "#fcf3f9",
      "border": "#e4bed9"
    },
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
      "src": "/companies/Beyond_Trust_2c94db65cf.png",
      "alt": "BeyondTrust platform integration listed under SOAR"
    },
    "platform": "BeyondTrust",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#1b7473",
      "background": "#f3fcfb",
      "border": "#bee4e4"
    },
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
      "src": "/companies/Auth0_7f9120be12.png",
      "alt": "Auth0 platform integration listed under SOAR"
    },
    "platform": "Auth0",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#74591b",
      "background": "#fcf9f3",
      "border": "#e4d9be"
    },
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
      "alt": "Atlassian platform integration listed under SOAR"
    },
    "platform": "Atlassian",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#3f1b74",
      "background": "#f7f3fc",
      "border": "#cebee4"
    },
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
      "alt": "At-Bay platform integration listed under SOAR"
    },
    "platform": "At-Bay",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#1b7425",
      "background": "#f3fcf4",
      "border": "#bee4c2"
    },
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
      "src": "/companies/Armis_f03553ca66.png",
      "alt": "Armis platform integration listed under SOAR"
    },
    "platform": "Armis",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#741b2b",
      "background": "#fcf3f5",
      "border": "#e4bec5"
    },
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
      "src": "/companies/Anomali_9e54213c47.png",
      "alt": "Anomali platform integration listed under SOAR"
    },
    "platform": "Anomali",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#1b4574",
      "background": "#f3f7fc",
      "border": "#bed0e4"
    },
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
      "alt": "Amazon platform integration listed under SOAR"
    },
    "platform": "Amazon",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#5e741b",
      "background": "#fafcf3",
      "border": "#dbe4be"
    },
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
      "alt": "Alien Labs OTX platform integration listed under SOAR"
    },
    "platform": "Alien Labs OTX",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#6f1b74",
      "background": "#fbf3fc",
      "border": "#e2bee4"
    },
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
      "alt": "AbuseIPDB platform integration listed under SOAR"
    },
    "platform": "AbuseIPDB",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#1b7455",
      "background": "#f3fcf9",
      "border": "#bee4d7"
    },
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
      "alt": "42Gears platform integration listed under SOAR"
    },
    "platform": "42Gears",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#743b1b",
      "background": "#fcf6f3",
      "border": "#e4ccbe"
    },
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
      "alt": "AIMS platform integration listed under SOAR"
    },
    "platform": "AIMS",
    "category": "SOAR",
    "categories": [
      "SOAR"
    ],
    "palette": {
      "foreground": "#221b74",
      "background": "#f4f3fc",
      "border": "#c1bee4"
    },
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
      "alt": "BlueCat Networks platform integration listed under SIEM"
    },
    "platform": "BlueCat Networks",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#2f741b",
      "background": "#f5fcf3",
      "border": "#c6e4be"
    },
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
      "src": "/companies/Checkpoint_379f9eb3c1.png",
      "alt": "Check Point platform integration listed under SIEM"
    },
    "platform": "Check Point",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#741b48",
      "background": "#fcf3f7",
      "border": "#e4bed2"
    },
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
      "src": "/companies/Cloud_Flare_d79b3b58b9.png",
      "alt": "Cloudflare platform integration listed under SIEM"
    },
    "platform": "Cloudflare",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#1b6274",
      "background": "#f3fafc",
      "border": "#bedde4"
    },
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
      "alt": "Criminal IP platform integration listed under SIEM"
    },
    "platform": "Criminal IP",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#746b1b",
      "background": "#fcfbf3",
      "border": "#e4e1be"
    },
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
      "src": "/companies/Cybereason_30ef103b1b.png",
      "alt": "Cybereason platform integration listed under SIEM"
    },
    "platform": "Cybereason",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#511b74",
      "background": "#f8f3fc",
      "border": "#d5bee4"
    },
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
      "src": "/companies/Dark_Trace_b2474f65e1.png",
      "alt": "Darktrace platform integration listed under SIEM"
    },
    "platform": "Darktrace",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#1b7438",
      "background": "#f3fcf6",
      "border": "#bee4ca"
    },
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
      "alt": "Docker platform integration listed under SIEM"
    },
    "platform": "Docker",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#741e1b",
      "background": "#fcf3f3",
      "border": "#e4bfbe"
    },
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
      "src": "/companies/Exabeam_632ad5eb9d.png",
      "alt": "Exabeam platform integration listed under SIEM"
    },
    "platform": "Exabeam",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#1b3274",
      "background": "#f3f5fc",
      "border": "#bec8e4"
    },
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
      "src": "/companies/F5_Networks_29efaf9842.png",
      "alt": "F5 Distributed Cloud Services platform integration listed under SIEM"
    },
    "platform": "F5 Distributed Cloud Services",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#4c741b",
      "background": "#f8fcf3",
      "border": "#d3e4be"
    },
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
      "src": "/companies/Forescout_cf0444200b.png",
      "alt": "Forescout platform integration listed under SIEM"
    },
    "platform": "Forescout",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#741b66",
      "background": "#fcf3fa",
      "border": "#e4bede"
    },
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
      "alt": "Graylog platform integration listed under SIEM"
    },
    "platform": "Graylog",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#1b7468",
      "background": "#f3fcfa",
      "border": "#bee4df"
    },
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
      "alt": "HashiCorp platform integration listed under SIEM"
    },
    "platform": "HashiCorp",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#744e1b",
      "background": "#fcf8f3",
      "border": "#e4d4be"
    },
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
      "src": "/companies/HP_93b89db5f7.png",
      "alt": "HP platform integration listed under SIEM"
    },
    "platform": "HP",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#341b74",
      "background": "#f5f3fc",
      "border": "#c9bee4"
    },
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
      "alt": "Infoblox platform integration listed under SIEM"
    },
    "platform": "Infoblox",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#1c741b",
      "background": "#f3fcf3",
      "border": "#bee4be"
    },
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
      "alt": "JumpCloud platform integration listed under SIEM"
    },
    "platform": "JumpCloud",
    "category": "SIEM",
    "categories": [
      "SIEM"
    ],
    "palette": {
      "foreground": "#741b36",
      "background": "#fcf3f6",
      "border": "#e4beca"
    },
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
      "alt": "Keeper Security platform integration listed under Cloud Security"
    },
    "platform": "Keeper Security",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#1b5074",
      "background": "#f3f8fc",
      "border": "#bed5e4"
    },
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
      "src": "/companies/Lace_Work_52d9ccb7dd.png",
      "alt": "Lacework platform integration listed under Cloud Security"
    },
    "platform": "Lacework",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#6a741b",
      "background": "#fbfcf3",
      "border": "#e0e4be"
    },
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
      "alt": "Malwarebytes platform integration listed under Cloud Security"
    },
    "platform": "Malwarebytes",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#641b74",
      "background": "#faf3fc",
      "border": "#ddbee4"
    },
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
      "alt": "Mattermost platform integration listed under Cloud Security"
    },
    "platform": "Mattermost",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#1b744a",
      "background": "#f3fcf8",
      "border": "#bee4d2"
    },
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
      "src": "/companies/Microsoft_bd16e6984a.png",
      "alt": "Microsoft platform integration listed under Cloud Security"
    },
    "platform": "Microsoft",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#74301b",
      "background": "#fcf5f3",
      "border": "#e4c7be"
    },
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
      "alt": "MISP TIP platform integration listed under Cloud Security"
    },
    "platform": "MISP TIP",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#1b2074",
      "background": "#f3f4fc",
      "border": "#bec0e4"
    },
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
      "alt": "OAuth platform integration listed under Cloud Security"
    },
    "platform": "OAuth",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#3a741b",
      "background": "#f6fcf3",
      "border": "#cbe4be"
    },
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
      "src": "/companies/Okta_8bdbaacb86.png",
      "alt": "Okta platform integration listed under Cloud Security"
    },
    "platform": "Okta",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#741b54",
      "background": "#fcf3f9",
      "border": "#e4bed6"
    },
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
      "src": "/companies/Palo_Alto_Networks_0c29017a03.png",
      "alt": "Palo Alto Networks platform integration listed under Cloud Security"
    },
    "platform": "Palo Alto Networks",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#1b6e74",
      "background": "#f3fbfc",
      "border": "#bee2e4"
    },
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
      "alt": "Prometheus platform integration listed under Cloud Security"
    },
    "platform": "Prometheus",
    "category": "Cloud Security",
    "categories": [
      "Cloud Security"
    ],
    "palette": {
      "foreground": "#74601b",
      "background": "#fcfaf3",
      "border": "#e4dcbe"
    },
    "integrations": [
      {
        "id": "prometheus-integration",
        "name": "Prometheus",
        "description": ""
      }
    ]
  }
];
