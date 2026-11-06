import type { Integration } from "@/features/integrations/types";

/** Demo records for UI development; these are not a verified integration portfolio.
 * Images are local text placeholders, ready to replace with official logos.
 */
export const dummyIntegrations: Integration[] = [
  {
    id: "armis", serviceName: "Armis", image: { src: "/images/services/armis.svg", alt: "Armis" },
    platform: "Armis", category: "IoT Security",
    integrations: [{ id: "armis-caasm", name: "Armis + CAASM", description: "This integration between Armis and the CAASM platform enhances enterprise asset visibility and security posture management by incorporating IoT device data. By ingesting Armis’ device, user, and vulnerability data, organizations can maintain a comprehensive view of their IoT asset landscape within their CAASM solution." }],
  },
  {
    id: "crowdstrike", serviceName: "CrowdStrike Falcon", image: { src: "/images/services/crowdstrike.svg", alt: "CrowdStrike" },
    platform: "CrowdStrike", category: "Endpoint Security",
    integrations: [{ id: "crowdstrike-siem", name: "CrowdStrike + SIEM", description: "Bring endpoint detections and device context into a central security workflow. Correlate endpoint activity with other signals to help teams investigate alerts and prioritize their response." }],
  },
  {
    id: "okta", serviceName: "Okta Identity Cloud", image: { src: "/images/services/okta.svg", alt: "Okta" },
    platform: "Okta", category: "Access Management",
    integrations: [{ id: "okta-siem", name: "Okta + SIEM", description: "Connect identity events with security monitoring. Review authentication activity alongside device and network context to investigate suspicious access." }],
  },
  {
    id: "wiz", serviceName: "Wiz Cloud Security", image: { src: "/images/services/wiz.svg", alt: "Wiz" },
    platform: "Wiz", category: "Cloud Security",
    integrations: [{ id: "wiz-secops", name: "Wiz + Security Operations", description: "Bring cloud findings into security operations workflows. Add cloud resource context to investigations and help teams coordinate remediation." }],
  },
  {
    id: "splunk", serviceName: "Splunk Enterprise Security", image: { src: "/images/services/splunk.svg", alt: "Splunk" },
    platform: "Splunk", category: "Platform Suite",
    integrations: [{ id: "splunk-intelligence", name: "Splunk + Threat Intelligence", description: "Enrich security events with threat intelligence to give analysts additional context when reviewing alerts and investigating activity." }],
  },
  {
    id: "palo-alto", serviceName: "Palo Alto Networks Firewall", image: { src: "/images/services/palo-alto.svg", alt: "Palo Alto Networks" },
    platform: "Palo Alto Networks", category: "Network Security",
    integrations: [{ id: "palo-alto-siem", name: "Palo Alto Networks + SIEM", description: "Connect firewall events with centralized monitoring. Combine network activity and security alerts to support investigation and response." }],
  },
  {
    id: "servicenow", serviceName: "ServiceNow Security Operations", image: { src: "/images/services/servicenow.svg", alt: "ServiceNow" },
    platform: "ServiceNow", category: "SecOps",
    integrations: [{ id: "servicenow-vulnerabilities", name: "ServiceNow + Vulnerability Management", description: "Connect vulnerability findings to remediation workflows. Give teams a shared view of findings, affected assets, and remediation progress." }],
  },
  {
    id: "tenable", serviceName: "Tenable Vulnerability Management", image: { src: "/images/services/tenable.svg", alt: "Tenable" },
    platform: "Tenable", category: "Platform Suite",
    integrations: [{ id: "tenable-caasm", name: "Tenable + CAASM", description: "Combine vulnerability findings with asset inventory to help teams identify exposure, understand asset context, and prioritize remediation." }],
  },
  {
    id: "cisco", serviceName: "Cisco Secure Network", image: { src: "/images/services/cisco.svg", alt: "Cisco" },
    platform: "Cisco", category: "Network Security",
    integrations: [{ id: "cisco-secops", name: "Cisco + Security Operations", description: "Bring network security events into a shared investigation workflow. Connect network activity with the broader security environment." }],
  },
  {
    id: "snyk", serviceName: "Snyk Application Security", image: { src: "/images/services/snyk.svg", alt: "Snyk" },
    platform: "Snyk", category: "Application Security",
    integrations: [{ id: "snyk-developer", name: "Snyk + Developer Workflows", description: "Bring application vulnerability findings into developer workflows to help teams review and track remediation alongside their existing work." }],
  },
];
