import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Log } from '@shared/logger.service';
import { SmartContractFacade } from '../../store/smartcontract-facade';
import * as fromModel from '../../models';

@Component({
    selector: 'smartcontract-call',
    templateUrl: './smartcontract-call.component.html',
    styleUrls: ['./smartcontract-call.component.scss']
})
export class SmartContractCallComponent implements OnInit {
    loaded$: Observable<boolean>;
    smartContractAction$: Observable<fromModel.SmartContractAction>;
    error$: Observable<string | Error>;

    constructor(private route: ActivatedRoute, private facade: SmartContractFacade, private log: Log) { }

    ngOnInit() {
        this.loadSmartContractAction();
    }

    private loadSmartContractAction() {
        // note: when the component is destroyed, ActivatedRoute instance dies with it, so there is no need to unsubscribe
        // see https://angular.io/guide/router#observable-parammap-and-component-reuse
        this.route.paramMap
            .subscribe((paramMap: any) => {
                if (!!paramMap.params.txId) {
                    let contractAddress = paramMap.params.address;
                    this.facade.getSmartContractAction(contractAddress);
                }
            });

        this.loaded$ = this.facade.smartContractAction$;
        this.error$ = this.facade.smartContractActionError$;
        this.smartContractAction$ = this.facade.smartContractAction$;
    }
}
