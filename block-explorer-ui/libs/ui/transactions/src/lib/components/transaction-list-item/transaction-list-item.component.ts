import { Component, OnInit, Input } from '@angular/core';
import { TransactionSummaryModel } from '@blockexplorer/shared/models';
import { LineItemModel } from 'gen/nswag';

@Component({
  selector: 'blockexplorer-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
  styleUrls: ['./transaction-list-item.component.css']
})
export class TransactionListItemComponent implements OnInit {
  @Input() transaction: TransactionSummaryModel;

  constructor() { }

  ngOnInit() {
  }

  public isUnspent(tx: LineItemModel) {
    return !!tx && !!this.transaction && !!this.transaction.in
              ? this.transaction.in.find(t => t.hash === tx.hash)
              : false;
  }

  public get transactionTime() {
    if (!this.transaction || !this.transaction.time) return 'Unknown';
    const date = new Date(1000 * this.transaction.time);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  public get transactionType() {
    if (!this.transaction) return 'Unknown';
    if (this.transaction.isCoinbase) return 'Coinbase';
    if (this.transaction.isCoinstake) return 'Coinstake';
    if (this.transaction.height === -50) return 'Smart Contract'
    return 'Transaction';
  }

}
