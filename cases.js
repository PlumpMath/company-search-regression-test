/* Kjør testene med:
 * 
 * buster test -r specification
 */
 
module.exports = [
  {
    search: "rørlegger oslo",
    better: { name: "Varme&Bad", id: "1236749" },
    worse: { name: "Realiseringsbygg", id: "2968057" },
    reason: "Viktigere at Varme&Bad er rørlegger enn at Realiseringsbygg har masse bra omtaler.."
  },
];


/* Legg til flere tester på dette formatet:
 * 
 * {
 *   search: "søkestreng",
 *   better: { name: "navn på det bedre treffet", id: "id'en fra bedriftsprofil-URLen" },
 *   worse: { name: "navn på det dårligere treffet", id: "id'en fra bedriftsprofil-URLen" },
 *   reason: "En fritekst for å minne oss på hvorfor treffene bør være slik."
 * },
 * 
 */
