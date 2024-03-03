export const render = contract => `
<div class="contract datacard
      ${contract.fulfilled ? 'fulfilled' : ''}
      ${contract.accepted ? 'accepted' : ''}">
   <h3 title="${contract.id}">${contract.id}</h3>
   <div class="details">
      <dl>
         <dt>Faction</dt>
         <dd>${contract.factionSymbol}</dd>
         <dt>Type</dt>
         <dd>${contract.type}</dd>
         <dt>Deadline</dt>
         <dd title="${contract.terms.deadline}">${new Date(contract.terms.deadline).toLocaleString()}</dd>
         <dt>Payment - on acceptance</dt>
         <dd>${contract.terms.payment.onAccepted}</dd>
         <dt>Payment - on fulfillment</dt>
         <dd>${contract.terms.payment.onFulfilled}</dd>
         <dt>Expiration</dt>
         <dd title="${contract.expiration}">${new Date(contract.expiration).toLocaleString()}</dd>
      </dl>

      <div class="wrapping-row">
         ${contract.terms.deliver.map(d => `
         <dl class="deliver">
            <dt>Deliver</dt>
            <dd>${d.tradeSymbol}</dd>
            <dt>Destination</dt>
            <dd><a href="" data-id="${d.destinationSymbol}">${d.destinationSymbol}</a></dd>
            <dt>Units required</dt>
            <dd>${d.unitsRequired}</dd>
            <dt>Units fulfilled</dt>
            <dd>${d.unitsFulfilled}</dd>
         </dl>`).join('')}
      </div>

      ${!contract.accepted
         ? `<button data-id="${contract.id}">Accept</button>`
         : ''}
   </div>
</div>
`
